/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateCommerceDto {
  @IsString()
  iduser: string;
  @IsString()
  names: string;
  @IsString()
  contact: string;
  @IsString()
  maill: string;
  @IsString()
  phoneNum: string;
  @IsString()
  typeService: string;
  @IsString()
  descripton: string;
  @IsString()
  country: string;
  @IsString()
  city: string;

  created_at: Date
  finished_at: Date
}
