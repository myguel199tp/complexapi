/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parking, ParkingSchema } from './shema/parking.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Parking.name,
        schema: ParkingSchema,
      },
    ]),
  ],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
