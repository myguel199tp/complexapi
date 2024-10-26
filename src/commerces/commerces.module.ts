/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CommercesController } from './commerces.controller';
import { Commerce, CommerceSchema } from './shema/commerce.shema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Commerce.name,
        schema: CommerceSchema,
      },
    ]),
  ],
  controllers: [CommercesController],
  providers: [CommercesService],
})
export class CommercesModule {}
