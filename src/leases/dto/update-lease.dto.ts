/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateLeaseDto } from './create-lease.dto';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
}

export class UpdateLeaseDto extends PartialType(CreateLeaseDto) {
  @IsNotEmpty()
  ofert: string;

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
  price: number;

  @IsNotEmpty()
  room: string;

  @IsNotEmpty()
  restroom: string;

  @IsNotEmpty()
  age: string;

  @IsNotEmpty()
  administration: string;

  @IsNotEmpty()
  area: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  createdAt: number = Date.now();

  @IsNotEmpty()
  finnallyAt: number = Date.now() + 60 * 24 * 60 * 60 * 1000;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => File)
  file: File[];

  constructor(data?: Partial<CreateLeaseDto>) {
    super();
    Object.assign(this, data);
    this.createdAt = Date.now();
    this.finnallyAt = this.createdAt + 60 * 24 * 60 * 60 * 1000;
  }
}
