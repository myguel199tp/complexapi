import { Module } from '@nestjs/common';
import { HollidayService } from './holliday.service';
import { HollidayController } from './holliday.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Holliday, HollidaySchema } from './shema/holliday.shema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Holliday.name,
        schema: HollidaySchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [HollidayController],
  providers: [HollidayService],
})
export class HollidayModule {}
