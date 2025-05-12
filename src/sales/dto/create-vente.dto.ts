/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVenteDto {
  @IsNotEmpty()
  @IsString()
  iduser: string;

  @IsString()
  @IsOptional()
  ofert: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  city: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  property: string;

  @IsString()
  stratum: string;

  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  room: string;

  @IsString()
  @IsOptional()
  restroom: string;

  @IsNotEmpty()
  @IsOptional()
  age: string;

  @IsString()
  @IsOptional()
  administration: string;

  @IsNotEmpty()
  area: string;

  @IsString()
  description: string;

  @IsString()
  files: string[];

  @IsString()
  created_at: string;

  @IsString()
  finished_at: string;
}
