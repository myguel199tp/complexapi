/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsEmail()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  termsConditions: string;

  // @ValidateNested({ each: true })
  // sales: CreateSaleDto[];

  // @ValidateNested({ each: true })
  // commerce: CreateFileDto[];
}
