import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStratumDto {
  @ApiProperty({ description: 'El identificador único del estrato' })
  @IsString()
  @IsNotEmpty({ message: 'El campo id es obligatorio.' })
  id: string;

  @ApiProperty({ description: 'El nombre del estrato o cantidad' })
  @IsString()
  @IsNotEmpty({ message: 'El campo name es obligatorio.' })
  name: string;
}
