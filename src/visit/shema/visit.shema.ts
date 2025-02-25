/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document;

@Schema()
export class Visit {
  @Prop()
  namevisit: string;

  @Prop()
  numberId: string;

  @Prop()
  nameUnit: string;

  @Prop()
  apartment?: string;

  @Prop()
  plaque?: string;

  @Prop()
  startHour?: string;

  @Prop()
  file?: string;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
