import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ReservationActivity,
  ReservationActivityDocument,
} from './shema/reservation-activity.shema';
import { Model } from 'mongoose';
import { ReservationActivityDto } from './dto/create-reservation-activity.dto';
import { startOfDay } from 'date-fns';

@Injectable()
export class ReservationActivityService {
  constructor(
    @InjectModel(ReservationActivity.name)
    private reservationActivityModule: Model<ReservationActivityDocument>,
  ) {}
  async create(reservationActivityModule: ReservationActivityDto) {
    const ofertCrate = await this.reservationActivityModule.create(
      reservationActivityModule,
    );
    return ofertCrate;
  }

  async findAll() {
    const today = startOfDay(new Date());

    const list = await this.reservationActivityModule.find({
      reservationDate: { $gte: today.toISOString() },
    });

    return list;
  }
}
