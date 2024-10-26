/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateRegisterComplexDto {
  @IsNotEmpty()
  nameComplex: string;
  @IsNotEmpty()
  reprecentComplex: string;
  @IsNotEmpty()
  emailReprecent: string;
  @IsNotEmpty()
  council: [{ name: string; numberApartment: string; phone: string }];
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  neigborhood: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  termsConditions: string;
  @IsNotEmpty()
  acquire: string;
  created_at: Date;
  finished_at: Date;
}
