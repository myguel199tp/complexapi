/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestroomDocument = Restroom & Document;

@Schema()
export class Restroom {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const RestroomSchema = SchemaFactory.createForClass(Restroom);
