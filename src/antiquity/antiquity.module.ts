import { Module } from '@nestjs/common';
import { AntiquityService } from './antiquity.service';
import { AntiquityController } from './antiquity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Antiquity, AntiquitySchema } from './shema/antiquity.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Antiquity.name,
        schema: AntiquitySchema,
      },
    ]),
  ],
  controllers: [AntiquityController],
  providers: [AntiquityService],
})
export class AntiquityModule {}
