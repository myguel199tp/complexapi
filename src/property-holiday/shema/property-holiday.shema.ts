/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyHolidayDocument = PropertyHoliday & Document;

@Schema()
export class PropertyHoliday {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const PropertyHolidaySchema =
  SchemaFactory.createForClass(PropertyHoliday);
