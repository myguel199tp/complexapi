/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InterestedService } from './interested.service';
import { InterestedController } from './interested.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Interested, InterestedSchema } from './shema/interested.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Interested.name,
        schema: InterestedSchema,
      },
    ]),
  ],
  controllers: [InterestedController],
  providers: [InterestedService],
})
export class InterestedModule {}
