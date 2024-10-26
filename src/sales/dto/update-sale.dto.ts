/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import { CreateSaleDto } from './create-sale.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
  @IsNotEmpty()
  ofert: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  parking: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  property: string;

  @IsNotEmpty()
  stratum: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  room: string;

  @IsNotEmpty()
  restroom: string;

  @IsNotEmpty()
  age: string;

  @IsNotEmpty()
  administration: string;

  @IsNotEmpty()
  area: string;

  @IsNotEmpty()
  description: string;
}
