/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSpecialityDto } from './create-speciality.dto';

export class UpdateSpecialityDto extends PartialType(CreateSpecialityDto) {
  id: string;
  name: string;
}
