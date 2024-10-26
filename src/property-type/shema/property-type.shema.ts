/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyTypeDocument = PropertyType & Document;

@Schema()
export class PropertyType {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const PropertyTypeSchema = SchemaFactory.createForClass(PropertyType);
