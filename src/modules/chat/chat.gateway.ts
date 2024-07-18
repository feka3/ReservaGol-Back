import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Get, OnModuleInit, Param } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp, Timestamp, setDoc, doc } from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { timestamp } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*', // Cambia esto si tu frontend está en otra URL
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Cliente conectado: ' + client.id);
  }
  
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado: ' + client.id);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket
  ) {
    client.join(room);
    console.log(`Cliente ${client.id} se unió a la sala ${room}`);

    try {
      const messages = await this.getPreviousMessages(room);
      client.emit('previousMessages', messages);
    } catch (error) {
      console.error('Error obteniendo los mensajes previos: ', error);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket
  ) {
    client.leave(room);
    console.log(`Cliente ${client.id} dejó la sala ${room}`);
  }

  @SubscribeMessage('chat-mensaje')
 async handleMessage(
    @MessageBody() data: { room: string; usuario: string; messages: string},
    @ConnectedSocket() client: Socket
  ) {
    const { room, usuario, messages} = data;

    // Verificar que los campos no sean undefined
    if (!room || !usuario || !messages ) {
      console.error('Datos inválidos:', data);
      return;
    }

    try {
      await addDoc(collection(db, `sports/${room}/messages`), {
        room,
        usuario,
        messages,
    
        timestamp: serverTimestamp(),
      });
      console.log('Mensaje guardado en Firestore');
    } catch (error) {
      console.error('Error guardando el mensaje: ', error);
    }

    this.server.to(room).emit('chat-mensaje', { usuario, messages});
  }

  async getPreviousMessages(room: string) {
    const q = query(collection(db, `sports/${room}/messages`), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => doc.data());
    return messages;
  }
}

