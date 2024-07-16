import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from 'src/config/firebase';


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
    const messages = await this.getPreviousMessages(room);
    client.emit('previousMessages', messages);
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
    @MessageBody() data: { room: string; usuario: string; messages: string },
    @ConnectedSocket() client: Socket
  ) {
    
    const { room, usuario, messages } = data;
    console.log(data);
    console.log('el usuario que envio es =>', usuario);
    console.log('mostrando solo el mensaje =>', messages);

    try {
      await addDoc(collection(db, 'messages'), {
        room,
        usuario,
        messages,
        timestamp: serverTimestamp(),
      });
      console.log('Mensaje guardado en Firestore');
    } catch (error) {
      console.error('Error guardando el mensaje: ', error);
    }
    this.server.to(room).emit('chat-mensaje', { usuario, messages });
  }

  async getPreviousMessages(room: string) {
    const q = query(collection(db, 'messages'), where('room', '==', room), orderBy('timestamp', 'asc'));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => doc.data());
    return messages;
  }

 
}
