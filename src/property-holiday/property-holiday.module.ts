import { Module } from '@nestjs/common';
import { PropertyHolidayService } from './property-holiday.service';
import { PropertyHolidayController } from './property-holiday.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PropertyHoliday,
  PropertyHolidaySchema,
} from './shema/property-holiday.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PropertyHoliday.name,
        schema: PropertyHolidaySchema,
      },
    ]),
  ],
  controllers: [PropertyHolidayController],
  providers: [PropertyHolidayService],
})
export class PropertyHolidayModule {}
