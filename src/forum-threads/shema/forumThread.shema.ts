import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Poll, PollSchema } from './poll.shema';

export type ForumThreadDocument = HydratedDocument<ForumThread>;

@Schema({ timestamps: true })
export class ForumThread {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ type: [PollSchema], default: [] })
  polls: Poll[];
}

export const ForumThreadSchema = SchemaFactory.createForClass(ForumThread);
