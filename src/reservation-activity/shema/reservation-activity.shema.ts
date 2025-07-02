/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationActivityDocument = ReservationActivity & Document;

@Schema()
export class ReservationActivity {
  @Prop()
  iduser: string;

  @Prop()
  activityId: string;

  @Prop()
  description?: string;

  @Prop()
  nameUnit?: string;

  @Prop()
  reservationDate: string;

  @Prop()
  created_at: string;
}
export const ReservationActivitySchema =
  SchemaFactory.createForClass(ReservationActivity);
