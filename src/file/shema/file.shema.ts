/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({ required: true })
  iduser: string;

  @Prop({ required: true })
  nameUnit: string;

  @Prop({ required: true })
  profession: string;

  @Prop({ required: true })
  webPage: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  files: string[];

  @Prop({ required: true })
  created_at: string;

  @Prop({ required: true })
  finished_at: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
