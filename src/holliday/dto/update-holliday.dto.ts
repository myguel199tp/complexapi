import { PartialType } from '@nestjs/swagger';
import { CreateHollidayDto } from './create-holliday.dto';

export class UpdateHollidayDto extends PartialType(CreateHollidayDto) {}
