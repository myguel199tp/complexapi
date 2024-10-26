/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AntiquityDocument = Antiquity & Document;

@Schema()
export class Antiquity {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const AntiquitySchema = SchemaFactory.createForClass(Antiquity);
