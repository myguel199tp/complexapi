/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecialityDocument = Speciality & Document;

@Schema()
export class Speciality {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const SpecialitySchema = SchemaFactory.createForClass(Speciality);
