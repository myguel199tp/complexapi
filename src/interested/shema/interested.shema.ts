/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InterestedDocument = Interested & Document;

@Schema()
export class Interested {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  cellPhone: string;

  @Prop()
  mail: string;

  @Prop()
  daysWeek: string;
}

export const InterestedSchema = SchemaFactory.createForClass(Interested);
