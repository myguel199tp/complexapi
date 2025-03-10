import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, index: true })
  recipientId: string;

  @Prop({ required: true, enum: ['delivered', 'pending'] })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
