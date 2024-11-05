import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommerceDto {
  @ApiProperty({ description: 'El identificador único del comercio' })
  @IsString()
  @IsNotEmpty({ message: 'El campo id es obligatorio.' })
  id: string;

  @ApiProperty({ description: 'El nombre del comercio o cantidad' })
  @IsString()
  @IsNotEmpty({ message: 'El campo name es obligatorio.' })
  name: string;
}
