import { Module } from '@nestjs/common';
import { OfertService } from './ofert.service';
import { OfertController } from './ofert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ofert, OfertSchema } from './shema/ofert.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ofert.name,
        schema: OfertSchema,
      },
    ]),
  ],
  controllers: [OfertController],
  providers: [OfertService],
})
export class OfertModule {}
