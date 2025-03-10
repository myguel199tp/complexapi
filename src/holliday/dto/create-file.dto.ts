import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { CreateHollidayDto } from './create-holliday.dto';

export class CreateFileHollidayDto extends CreateHollidayDto {
  @ApiProperty({ description: 'Las imágenes' })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsObject({ each: true })
  files: Express.Multer.File[];
}
