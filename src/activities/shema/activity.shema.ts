/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop()
  nameunit: string;
  @Prop()
  city: string;
  @Prop()
  activity: string;
  @Prop()
  dateHourStart: string;
  @Prop()
  dateHourEnd: string;
  @Prop()
  file: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
