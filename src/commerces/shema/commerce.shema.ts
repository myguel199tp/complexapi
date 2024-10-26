/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommerceDocument = Commerce & Document;

@Schema()
export class Commerce {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const CommerceSchema = SchemaFactory.createForClass(Commerce);