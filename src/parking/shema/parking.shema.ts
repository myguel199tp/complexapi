/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParkingDocument = Parking & Document;

@Schema()
export class Parking {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const ParkingSchema = SchemaFactory.createForClass(Parking);
