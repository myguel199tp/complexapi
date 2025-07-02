/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;

@Schema()
export class Record {
  @Prop({ required: true })
  iduser: string;
  @Prop({ required: true })
  nameUnit: string;
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  file?: string;
  @Prop({ required: true })
  created_at: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
