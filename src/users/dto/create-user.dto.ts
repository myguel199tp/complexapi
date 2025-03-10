import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'El identificador único del nobre' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'El identificador único del apellido' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({ description: 'El identificador único de ciudad' })
  @IsString()
  @IsNotEmpty()
  city: string;
  @ApiProperty({ description: 'El identificador único del celular' })
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'El identificador único del correo' })
  @IsEmail()
  email: string;
  @IsString()
  @ApiProperty({ description: 'El identificador único de contraseña' })
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  termsConditions: boolean;
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  file?: string;

  @ApiProperty({ description: 'name unit' })
  @IsOptional()
  @IsString()
  nameUnit?: string;

  @ApiProperty({ description: 'name unit' })
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  neigborhood?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsString()
  rol: string;

  @IsString()
  quantityapt?: number;

  @IsOptional()
  @IsString()
  apartment?: string;

  @IsOptional()
  @IsString()
  plaque?: string;

  @IsOptional()
  @IsString()
  numberid?: string;
}
