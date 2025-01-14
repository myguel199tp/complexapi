/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop()
  activityid: string;
  @Prop()
  activity: string;
  @Prop()
  description: string;
  @Prop()
  hours: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
