import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty({ message: 'El campo actividad es nombre.' })
  nameunit: string;
  @IsString()
  @IsNotEmpty({ message: 'El campo actividad es nombre.' })
  city: string;
  @IsString()
  @IsNotEmpty({ message: 'El campo actividad es obligatorio.' })
  activity: string;
  @IsString()
  @IsNotEmpty({ message: 'El horario id es obligatorio.' })
  dateHourStart: string;
  @IsString()
  @IsNotEmpty({ message: 'El horario id es obligatorio.' })
  dateHourEnd: string;
  @IsOptional()
  @IsString()
  file?: string;
}
