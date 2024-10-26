/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StratumDocument = Stratum & Document;

@Schema()
export class Stratum {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const StratumSchema = SchemaFactory.createForClass(Stratum);
