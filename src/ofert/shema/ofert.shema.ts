/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfertDocument = Ofert & Document;

@Schema()
export class Ofert {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const OfertSchema = SchemaFactory.createForClass(Ofert);
