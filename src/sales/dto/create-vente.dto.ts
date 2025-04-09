/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVenteDto {
  @IsNotEmpty()
  @IsString()
  iduser: string;

  @IsString()
  ofert: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  parking: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  property: string;

  @IsString()
  stratum: string;

  @IsNotEmpty()
  price: string;

  @IsString()
  room: string;

  @IsString()
  restroom: string;

  @IsNotEmpty()
  age: string;

  @IsString()
  administration: string;

  @IsNotEmpty()
  area: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  files: string[];

  @IsString()
  created_at: string;

  @IsString()
  finished_at: string;
}
