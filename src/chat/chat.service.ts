import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Message } from './shema/message.shema';

@Injectable()
export class ChatService implements OnModuleInit {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    console.log(
      '📡 Estado de la conexión a MongoDB:',
      this.connection.readyState,
    );
  }

  // Guardar un mensaje en la BD
  async saveMessage({
    userId,
    message,
    recipientId,
    status,
  }: {
    userId: string;
    message: string;
    recipientId: string;
    status: 'delivered' | 'pending';
  }) {
    console.log('💾 Guardando mensaje:', {
      userId,
      message,
      recipientId,
      status,
    });

    try {
      const newMessage = new this.messageModel({
        userId,
        message,
        recipientId,
        status,
      });
      const savedMessage = await newMessage.save();
      console.log('✅ Mensaje guardado correctamente:', savedMessage);
      return savedMessage;
    } catch (error) {
      console.error('❌ Error al guardar el mensaje:', error);
      throw new Error('Error al guardar el mensaje');
    }
  }

  // Obtener mensajes pendientes de un usuario
  async getPendingMessages(userId: string) {
    return await this.messageModel
      .find({ recipientId: userId, status: 'pending' })
      .exec();
  }

  // Marcar mensajes como entregados
  async markMessagesAsSent(userId: string) {
    await this.messageModel.updateMany(
      { recipientId: userId, status: 'pending' },
      { status: 'delivered' },
    );
  }
}
