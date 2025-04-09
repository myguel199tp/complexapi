import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty({ message: 'El campo estado es nombre.' })
  status: boolean;
  @IsString()
  @IsNotEmpty({ message: 'El campo unidad es obligatorio.' })
  nameUnit: string;
  @IsString()
  @IsString()
  @IsNotEmpty({ message: 'El campo actividad es obligatorio.' })
  activity: string;
  @IsString()
  @IsNotEmpty({ message: 'El campo descripcion es obligatorio.' })
  description: string;
  @IsString()
  @IsNotEmpty({ message: 'El horario id es obligatorio.' })
  dateHourStart: string;
  @IsString()
  @IsNotEmpty({ message: 'El horario id es obligatorio.' })
  dateHourEnd: string;
  @IsOptional()
  @IsString()
  files: string[];
}
