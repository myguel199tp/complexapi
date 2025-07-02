import { Module } from '@nestjs/common';
import { ReservationActivityService } from './reservation-activity.service';
import { ReservationActivityController } from './reservation-activity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ReservationActivity,
  ReservationActivitySchema,
} from './shema/reservation-activity.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReservationActivity.name,
        schema: ReservationActivitySchema,
      },
    ]),
  ],
  controllers: [ReservationActivityController],
  providers: [ReservationActivityService],
})
export class ReservationActivityModule {}
