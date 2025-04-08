/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Passenger {
  @Prop({ required: true, enum: ['adulto', 'niño', 'bebe'] })
  type: 'adulto' | 'niño' | 'bebe';

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, enum: ['0-2', '3-11', '12+'] })
  ageRange: '0-2' | '3-13' | '14+';
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);

@Schema()
export class Booking {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  holidayId: string;

  @Prop({ type: [PassengerSchema], required: true })
  passengers: Passenger[];

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, min: 0 })
  totalPrice: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
