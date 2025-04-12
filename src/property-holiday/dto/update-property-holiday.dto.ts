import { PartialType } from '@nestjs/swagger';
import { CreatePropertyHolidayDto } from './create-property-holiday.dto';

export class UpdatePropertyHolidayDto extends PartialType(CreatePropertyHolidayDto) {}
