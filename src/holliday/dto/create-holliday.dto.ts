import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateHollidayDto {
  @IsNotEmpty()
  @IsString()
  iduser: string;

  @IsOptional()
  @IsString()
  neigborhood?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: string;  

  @IsNotEmpty()
  @IsString()
  maxGuests: number;

  @IsNotEmpty()
  @IsString()
  property: string;

  @IsNotEmpty()
  @IsString()
  parking: string;

  @IsNotEmpty()
  @IsString()
  petsAllowed: boolean;

  @IsNotEmpty()
  @IsString()
  ruleshome: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  files: string[];

  @IsString()
  @IsOptional()
  promotion?: string;

  @IsNotEmpty()
  @IsString()
  nameUnit: string;

  @IsNotEmpty()
  @IsString()
  apartment: string;

  @IsNotEmpty()
  @IsString()
  cel: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  created_at: string;
}
