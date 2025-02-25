import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateHollidayDto {
  @IsNotEmpty()
  @IsString()
  nameUnit: string;

  @IsNotEmpty()
  @IsString()
  apartment: string;

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
  description: string;
}
