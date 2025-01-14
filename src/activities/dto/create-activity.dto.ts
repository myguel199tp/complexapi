import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty({ message: 'El campo actividad es obligatorio.' })
  activityid: string;
  @IsString()
  @IsNotEmpty({ message: 'El campo actividad es obligatorio.' })
  activity: string;
  @IsString()
  @IsNotEmpty({ message: 'El descripción id es obligatorio.' })
  description: string;
  @IsString()
  @IsNotEmpty({ message: 'El horario id es obligatorio.' })
  hours: string;
}
