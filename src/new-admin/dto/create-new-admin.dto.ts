import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewAdminDto {
  @ApiProperty({ description: 'El título', example: 'Título de la noticia' })
  @IsNotEmpty({ message: 'El campo título es obligatorio.' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'El mensaje de texto',
    example: 'Este es el texto del mensaje.',
  })
  @IsNotEmpty({ message: 'El campo mensaje es obligatorio.' })
  @IsString()
  textmessage: string;

  @ApiProperty({ description: 'Nombre de la unidad', example: 'Unidad 1' })
  @IsNotEmpty({ message: 'El campo unidad es obligatorio.' })
  @IsString()
  nameUnit: string;

  @ApiProperty({
    description: 'Correo del administrador',
    example: 'admin@correo.com',
  })
  @IsNotEmpty({ message: 'El correo es obligatorio.' })
  @IsString()
  mailAdmin: string;

  @ApiProperty({
    description: 'Archivo opcional del usuario',
    required: false,
    example: 'archivo.jpg',
  })
  @IsOptional()
  @IsString()
  file?: string;
}
