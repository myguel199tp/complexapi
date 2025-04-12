import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateHollidayDto {
  nameUnit: string;

  @IsNotEmpty()
  @IsString()
  neigborhood: string;

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
  status: boolean;

  @IsNotEmpty()
  @IsString()
  maxGuests: number;

  @IsNotEmpty()
  @IsString()
  parking: boolean;

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
}
