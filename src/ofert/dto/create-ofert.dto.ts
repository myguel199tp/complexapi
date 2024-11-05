import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfertDto {
  @ApiProperty({ description: 'El identificador único de oferta' })
  @IsString()
  @IsNotEmpty({ message: 'El campo id es obligatorio.' })
  id: string;

  @ApiProperty({ description: 'El nombre del oferta o cantidad' })
  @IsString()
  @IsNotEmpty({ message: 'El campo name es obligatorio.' })
  name: string;
}
