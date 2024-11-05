import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateInterestedDto {
  @ApiProperty({ description: 'El nombre del interesado' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'El apellido del interesado' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({ description: 'El celular del interesado' })
  @IsString()
  @IsNotEmpty()
  cellPhone: string;
  @ApiProperty({ description: 'El correo del interesado' })
  @IsEmail()
  @IsNotEmpty()
  mail: string;
  @ApiProperty({ description: 'dias' })
  @IsNotEmpty()
  daysWeek: string;
}
