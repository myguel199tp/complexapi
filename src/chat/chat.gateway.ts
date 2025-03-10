import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`🟢 Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Cliente desconectado: ${client.id}`);
  }

  // 🔹 Usuarios se unen a una sala compartida
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody()
    { userId, recipientId }: { userId: string; recipientId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const roomId = [userId, recipientId].sort().join('_'); // Nombre único para la sala

    client.join(roomId);
    console.log(`📡 Usuario ${userId} se unió a la sala ${roomId}`);

    // Recuperar mensajes pendientes para el usuario que se conecta
    const pendingMessages = await this.chatService.getPendingMessages(userId);

    // Emitir los mensajes pendientes
    if (pendingMessages.length > 0) {
      console.log(`📩 Enviando mensajes pendientes a ${userId}`);
      pendingMessages.forEach((message) => {
        this.server.to(roomId).emit('receiveMessage', message);
      });

      // Marcar mensajes como entregados
      await this.chatService.markMessagesAsSent(userId);
    }
  }

  // 🔹 Enviar mensaje a una sala compartida
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    {
      userId,
      message,
      recipientId,
    }: { userId: string; message: string; recipientId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const roomId = [userId, recipientId].sort().join('_');

    console.log(
      `📩 Nuevo mensaje en sala ${roomId}: "${message}" de ${userId} para ${recipientId}`,
    );

    // Guardar mensaje como pendiente en la base de datos
    const savedMessage = await this.chatService.saveMessage({
      userId,
      message,
      recipientId,
      status: 'pending', // Mensaje marcado como pendiente
    });

    // 🔹 Verifica si hay usuarios en la sala antes de emitir
    const clients = this.server.sockets.adapter.rooms.get(roomId);
    console.log(
      `👥 Usuarios en la sala ${roomId}:`,
      clients ? [...clients] : 'No hay usuarios',
    );

    // Emitir mensaje solo si hay alguien en la sala
    if (clients && clients.size > 0) {
      this.server.to(roomId).emit('receiveMessage', savedMessage);
      console.log(`📤 Mensaje enviado a la sala ${roomId}`);
    } else {
      console.log(
        `⚠️ Nadie en la sala ${roomId}, el mensaje se guarda como pendiente.`,
      );
    }
  }
}
