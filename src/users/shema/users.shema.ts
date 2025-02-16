/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  city: string;
  @Prop()
  phone: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;

  @Prop()
  termsConditions: boolean;

  @Prop()
  file?: string;

  @Prop()
  nameUnit?: string;

  @Prop()
  address?: string;

  @Prop()
  neigborhood?: string;

  @Prop()
  country?: string;

  @Prop()
  rol: string;

  @Prop()
  quantityapt?: number;

  @Prop()
  apartment?: string;

  @Prop()
  plaque?: string;

  @Prop()
  numberid?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
