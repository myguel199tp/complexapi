import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  termsConditions: string;
  @IsNotEmpty()
  nameUnit: string;
  @ApiProperty({
    description: 'Ruta de la imagen del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  file?: string;
}
