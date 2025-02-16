import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty({ message: 'El campo actividad es nombre.' })
  nameunit: string;
  @IsString()
  @IsNotEmpty({ message: 'El campo actividad es obligatorio.' })
  activity: string;
  @IsString()
  @IsNotEmpty({ message: 'El descripción id es obligatorio.' })
  apto: string;
  @IsString()
  @IsNotEmpty({ message: 'El horario id es obligatorio.' })
  dateHours: string;
  @IsString()
  @IsNotEmpty({ message: 'El descripción id es obligatorio.' })
  name: string;
}
