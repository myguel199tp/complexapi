import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommerceDto {
  @IsNotEmpty()
  @IsString()
  iduser: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nameUnit: string;

  @IsNotEmpty()
  @IsString()
  profession: string;

  @IsNotEmpty()
  @IsString()
  webPage: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  files: string[];

  @IsString()
  created_at: string;

  @IsString()
  finished_at: string;
}
