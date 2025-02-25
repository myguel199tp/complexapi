import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HollidayDocument = Holliday & Document;

export interface misFiles {
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
  _id: string;
  __v: number;
}

@Schema()
export class Holliday {
  @Prop()
  files: misFiles[];

  @Prop({ required: true })
  nameUnit: string;

  @Prop({ required: true })
  apartment: string;

  @Prop({ required: true })
  neigborhood: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  description: string;
}

export const HollidaySchema = SchemaFactory.createForClass(Holliday);
