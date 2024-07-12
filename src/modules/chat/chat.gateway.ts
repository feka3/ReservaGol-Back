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
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket
  ) {
    client.join(room);
    console.log(`Cliente ${client.id} se unió a la sala ${room}`);
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
  handleMessage(
    @MessageBody() data: { room: string; usuario: string; messages: string },
    @ConnectedSocket() client: Socket
  ) {
    const { room, usuario, messages } = data;
    console.log(data);
    console.log('el usuario que envio es =>', usuario);
    console.log('mostrando solo el mensaje =>', messages);
    this.server.to(room).emit('chat-mensaje', { usuario, messages });
  }


  /* @SubscribeMessage('chat-mensaje')
  handleEvent(@MessageBody() data) {
    console.log(data);
    console.log('el usuario que envio es =>', data.usuario);
    console.log('mostrando solo el mensaje =>', data.messages);
    this.server.emit('chat-mensaje', data);

    this.server.on('chat-mensaje', (data) => {
      console.log(data);
    });
  } */
}
