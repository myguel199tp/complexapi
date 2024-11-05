import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ description: 'El identificador del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El campo id es obligatorio.' })
  iduser: string;
  @ApiProperty({ description: 'El nombre del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio.' })
  name: string;
  @ApiProperty({ description: 'El correo del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El campo correo es obligatorio.' })
  maill: string;
  @ApiProperty({ description: 'El celular del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El campo telefono  es obligatorio.' })
  phoneNum: string;
  @ApiProperty({ description: 'la descripción' })
  @IsString()
  descripton: string;
}
