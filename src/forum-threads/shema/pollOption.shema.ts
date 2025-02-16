import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PollOptionDocument = HydratedDocument<PollOption>;

@Schema()
export class PollOption {
  @Prop({ required: true })
  option: string;

  @Prop({ default: 0 })
  votes: number;

  @Prop({ default: () => new mongoose.Types.ObjectId() })
  id: string;
}

export const PollOptionSchema = SchemaFactory.createForClass(PollOption);
