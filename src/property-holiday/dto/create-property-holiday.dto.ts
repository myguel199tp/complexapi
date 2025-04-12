import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePropertyHolidayDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  id?: string;

  @IsString()
  @ApiProperty()
  name: string;
}
