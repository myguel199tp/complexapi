import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { CreateCommerceDto } from './create-commerce.dto';

export class CreateFileDto extends CreateCommerceDto {
  @ApiProperty({ description: 'Las imágenes' })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsObject({ each: true })
  files: Express.Multer.File[];
}
