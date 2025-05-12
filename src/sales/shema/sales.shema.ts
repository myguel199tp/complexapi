/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalesDocument = Sales & Document;

@Schema()
export class Sales {
  @Prop()
  iduser: string;

  @Prop()
  ofert: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  parking?: string;

  @Prop()
  neighborhood: string;

  @Prop()
  address: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  property?: string;

  @Prop()
  stratum?: string;

  @Prop()
  price: string;

  @Prop()
  room?: string;

  @Prop()
  restroom?: string;

  @Prop()
  age?: string;

  @Prop()
  administration?: string;

  @Prop()
  area: string;

  @Prop()
  description: string;

  @Prop()
  files: string[];
  @Prop()
  created_at: string;
  @Prop()
  finished_at: string;
}

export const SalesSchema = SchemaFactory.createForClass(Sales);
