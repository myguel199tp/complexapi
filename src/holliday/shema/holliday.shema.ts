import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HollidayDocument = Holliday & Document;

@Schema()
export class Holliday {
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
  maxGuests: number;

  @Prop({ required: true })
  parking: string;

  @Prop({ required: true })
  petsAllowed: boolean;

  @Prop({ required: true })
  ruleshome: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  files: string[];

  @Prop({ required: false })
  promotion?: string;

  @Prop({ required: false })
  nameUnit: string;

  @Prop({ required: false })
  apartment?: string;

  @Prop({ required: true })
  cel: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop()
  created_at: string;
}

export const HollidaySchema = SchemaFactory.createForClass(Holliday);
