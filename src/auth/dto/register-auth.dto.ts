/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger'
import { LoginAuthDto } from './login-auth.dto'
import { IsNotEmpty } from 'class-validator'

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  termsConditions: boolean;

}
