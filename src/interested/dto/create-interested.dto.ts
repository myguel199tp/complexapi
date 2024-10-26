import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateInterestedDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  cellPhone: string;

  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  daysWeek: string;
}
