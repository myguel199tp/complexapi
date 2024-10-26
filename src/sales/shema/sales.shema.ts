/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalesDocument = Sales & Document;

export interface misFiles {
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
  _id: number;
  __v: number;
}

@Schema()
export class Sales {
  @Prop()
  files: misFiles[];

  @Prop({ required: true })
  iduser: string; 

  @Prop({ required: true })
  ofert: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  parking: string;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  property: string;

  @Prop({ required: true })
  stratum: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  room: string;

  @Prop({ required: true })
  restroom: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true })
  administration: string;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  description: string;

  created_at: Date
  finished_at: Date
}

export const SalesSchema = SchemaFactory.createForClass(Sales);
