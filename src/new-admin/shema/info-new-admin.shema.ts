/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InfoNewAdminDocument = InfoNewAdmin & Document;

@Schema()
export class InfoNewAdmin {
  @Prop()
  title: string;
  @Prop()
  textmessage: string;
  @Prop()
  nameUnit: string;
  @Prop()
  mailAdmin: string;
  @Prop()
  file?: string;
}

export const InfoNewAdminSchema = SchemaFactory.createForClass(InfoNewAdmin);
