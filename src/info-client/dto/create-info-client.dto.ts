/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateInfoClientDto {
  @ApiProperty({ description: 'El identificador único del cliente' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'El correo del cliente' })
  @IsNotEmpty()
  emailClient: string;
  @ApiProperty({ description: 'El celular del cliente' })
  @IsNotEmpty()
  cellphone: string;
  @ApiProperty({ description: 'El mensaje' })
  @IsNotEmpty()
  message: string;
}
