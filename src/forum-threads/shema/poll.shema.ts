import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PollOption, PollOptionSchema } from './pollOption.shema';

export type PollDocument = HydratedDocument<Poll>;

@Schema({ timestamps: true })
export class Poll {
  @Prop({ required: true })
  question: string;

  @Prop({ type: [PollOptionSchema], default: [] })
  options: PollOption[];
}

export const PollSchema = SchemaFactory.createForClass(Poll);
