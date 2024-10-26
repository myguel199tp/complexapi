/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

export interface misFiles {
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
  _id: string;
  __v: number;
}

@Schema()
export class File {
  @Prop()
  files: misFiles[];

  @Prop({ required: true })
  iduser: string;

  @Prop({ required: true })
  names: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  maill: string;

  @Prop({ required: true })
  phoneNum: string;

  @Prop({ required: true })
  typeService: string;

  @Prop({ required: true })
  descripton: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  created_at: Date
  finished_at: Date
}

export const FileSchema = SchemaFactory.createForClass(File);
