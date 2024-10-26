/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator'

export class CreateInfoClientDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  emailClient: string;

  @IsNotEmpty()
  cellphone: string;

  @IsNotEmpty()
  message: string;
}
