import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'El identificador único del room' })
  @IsString()
  @IsNotEmpty({ message: 'El campo id es obligatorio.' })
  id: string;

  @ApiProperty({ description: 'El nombre del room o cantidad' })
  @IsString()
  @IsNotEmpty({ message: 'El campo name es obligatorio.' })
  name: string;
}
