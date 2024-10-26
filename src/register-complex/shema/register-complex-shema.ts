/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegisterComplexDocument = 
RegisterComplex & Document;

@Schema()
export class RegisterComplex {
  @Prop({ required: true })
  nameComplex: string;
  @Prop({ required: true })
  reprecentComplex: string;
  @Prop({ required: true })
  emailReprecent: string;
  @Prop({ required: true })
  council: [{ name: string; numberApartment: string; phone: string }];
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  neigborhood: string;
  @Prop({ required: true })
  country: string;
  @Prop({ required: true })
  termsConditions: string;

  acquire: string;
  created_at: Date;
  finished_at: Date;

}

export const RegisterComplexSchema = SchemaFactory.createForClass(RegisterComplex);
