import { PartialType } from '@nestjs/swagger';
import { ReservationActivityDto } from './create-reservation-activity.dto';

export class UpdateReservationActivityDto extends PartialType(
  ReservationActivityDto,
) {}
