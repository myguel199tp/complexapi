import { IsOptional, IsString } from 'class-validator';

export class ReservationActivityDto {
  @IsString()
  iduser: string;

  @IsString()
  activityId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  nameUnit?: string;

  @IsString()
  reservationDate: string;

  @IsString()
  created_at: string;
}
