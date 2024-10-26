import { PartialType } from '@nestjs/swagger';
import { CreateInfoClientDto } from './create-info-client.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateInfoClientDto extends PartialType(CreateInfoClientDto) {
  @IsNotEmpty()
  prod: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  emailClient: string;

  @IsNotEmpty()
  cellphone: string;
}
