import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      const { name, accessToken } = socket.handshake.auth;
      console.log({ name, accessToken });

      if (!name) {
        socket.disconnect();
        return;
      }

      this.chatService.onClientConnected({ id: socket.id, name: name });
      this.server.emit('on-clients-changed', this.chatService.getClients());

      socket.on('disconnect', () => {
        this.chatService.onClientDisconnected(socket.id);
        this.server.emit('on-clients-changed', this.chatService.getClients());
      });
    });
  }

  @SubscribeMessage('send-message')
  async handleMessage(
    @MessageBody() payload: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { name } = client.handshake.auth;
    const { message } = payload;

    console.log('Mensaje recibido en el servidor:', { name, message });

    if (!message) {
      return;
    }

    await this.chatService.saveMessage(client.id, name, message);

    this.server.emit('on-message', {
      userId: client.id,
      message: message,
      name: name,
    });
  }

  @SubscribeMessage('send-private-message')
  async handlePrivateMessage(
    @MessageBody() { message, to }: { message: string; to: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { name } = client.handshake.auth;
    console.log({ name, message, to });

    if (!message || !to) {
      return;
    }

    await this.chatService.saveMessage(client.id, name, message, to);

    client.to(to).emit('on-private-message', {
      userId: client.id,
      message: message,
      name: name,
    });
  }
}
