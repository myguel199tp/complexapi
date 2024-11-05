import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAntiquityDto {
  @ApiProperty({ description: 'El identificador único de antiguedad' })
  @IsString()
  @IsNotEmpty({ message: 'El campo id es obligatorio.' })
  id: string;

  @ApiProperty({ description: 'La cantidad' })
  @IsString()
  @IsNotEmpty({ message: 'El campo name es obligatorio.' })
  name: string;
}
