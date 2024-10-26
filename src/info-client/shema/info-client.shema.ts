/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InfoClientDocument = InfoClient & Document;

@Schema()
export class InfoClient {
  @Prop()
  prod: string;

  @Prop()
  name: string;

  @Prop()
  emailClient: string;

  @Prop()
  cellphone: string;
}

export const InfoClientSchema = SchemaFactory.createForClass(InfoClient);
