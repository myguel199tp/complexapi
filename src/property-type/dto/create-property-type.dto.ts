import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreatePropertyTypeDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  id?: string;

  @IsString()
  @ApiProperty()
  name: string;
}
