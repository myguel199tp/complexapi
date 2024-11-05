import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommerceDto {
  @ApiProperty({ description: 'El identificador del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El campo id es obligatorio.' })
  iduser: string;

  @ApiProperty({ description: 'El nombre' })
  @IsString()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio.' })
  names: string;

  @ApiProperty({ description: 'El contacto' })
  @IsString()
  @IsNotEmpty({ message: 'El campo contacto es obligatorio.' })
  contact: string;

  @ApiProperty({ description: 'El correo' })
  @IsString()
  @IsNotEmpty({ message: 'El campo correo es obligatorio.' })
  maill: string;

  @ApiProperty({ description: 'El celular' })
  @IsString()
  @IsNotEmpty({ message: 'El campo celular es obligatorio.' })
  phoneNum: string;

  @ApiProperty({ description: 'El tipo de servicio' })
  @IsString()
  @IsNotEmpty({ message: 'El campo servicio es obligatorio.' })
  typeService: string;

  @ApiProperty({ description: 'La descripción' })
  @IsString()
  @IsNotEmpty({ message: 'El campo descripción es obligatorio.' })
  descripton: string;

  @ApiProperty({ description: 'El país' })
  @IsString()
  @IsNotEmpty({ message: 'El campo país es obligatorio.' })
  country: string;

  @ApiProperty({ description: 'La ciudad' })
  @IsString()
  @IsNotEmpty({ message: 'El campo ciudad es obligatorio.' })
  city: string;
}
