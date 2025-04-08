import {
  IsDateString,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PassengerInfo {
  @IsString()
  type: 'mayor' | 'menor' | 'bebe';

  @IsNumber()
  quantity: number;

  @IsString()
  ageRange: '0-2' | '3-13' | '14+';
}

export class CreateBookingDto {
  @IsString()
  userId: string;

  @IsString()
  hollidayId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PassengerInfo)
  passengers: PassengerInfo[];

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  totalPrice: number;
}
