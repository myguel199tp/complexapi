/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeasesDocument = Leases & Document;

@Schema()
export class Leases {
  @Prop()
  ofert: string;

  @Prop()
  parking: string;

  @Prop()
  neighborhood: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  property: string;

  @Prop()
  stratum: string;

  @Prop()
  price: number;

  @Prop()
  room: string;

  @Prop()
  restroom: string;

  @Prop()
  age: string;

  @Prop()
  administration: string;

  @Prop()
  area: string;

  @Prop()
  description: string;

  @Prop([String])
  file: string[];
}

export const LeasesSchema = SchemaFactory.createForClass(Leases);
