import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({ description: 'El nombre del visitante' })
  @IsString()
  @IsNotEmpty({ message: 'El campo namevisit visitante es obligatorio.' })
  namevisit: string;

  @ApiProperty({ description: 'El número de identificacion visitante' })
  @IsString()
  @IsNotEmpty({ message: 'El campo numberid  es obligatorio.' })
  numberId: string;

  @ApiProperty({ description: 'Nombre de la unidad', example: 'Unidad 1' })
  @IsNotEmpty({ message: 'El campo unidad es obligatorio.' })
  @IsString()
  nameUnit: string;

  @ApiProperty({ description: 'El número de identificacion visitante' })
  @IsString()
  @IsNotEmpty({ message: 'El campo numberid  es obligatorio.' })
  apartment?: string;

  @IsOptional()
  @IsString()
  plaque?: string;

  @IsOptional()
  @IsString()
  startHour?: string;
  @IsOptional()
  @IsString()
  file?: string;
}
