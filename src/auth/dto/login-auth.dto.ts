import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ description: 'El Correo electronico' })
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'La contraseña' })
  @MinLength(4)
  @MaxLength(12)
  password: string;
}

export class LoginAuthConjuntoDto {
  @ApiProperty({ description: 'El nombre' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'El correo electronico' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'La contraseña' })
  @MinLength(4)
  @MaxLength(12)
  password: string;

  @ApiProperty({ description: 'El nombre de la unidad' })
  @IsString()
  @IsNotEmpty()
  nameUnit: string;
}
