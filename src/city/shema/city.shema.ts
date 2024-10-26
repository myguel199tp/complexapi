/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop({ required: true })
  indicative: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  country: string;

  @Prop([{ id: { type: Number, required: true }, name: { type: String, required: true } }])
  city: { id: number; name: string }[];
}

export const CitySchema = SchemaFactory.createForClass(City);