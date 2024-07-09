import {
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

  @SubscribeMessage('chat-mensaje')
  handleEvent(@MessageBody() data) {
    console.log(data);
    console.log('el usuario que envio es =>', data.usuario);
    console.log('mostrando solo el mensaje =>', data.messages);
    this.server.emit('chat-mensaje', data);

    this.server.on('chat-mensaje', (data) => {
      console.log(data);
    });
  }
}
