/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Speciality, SpecialitySchema } from './shema/specialite.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Speciality.name,
        schema: SpecialitySchema,
      },
    ]),
  ],
  controllers: [SpecialityController],
  providers: [SpecialityService],
})
export class SpecialityModule {}
