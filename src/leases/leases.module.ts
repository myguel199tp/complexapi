import { Module } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { LeasesController } from './leases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leases, LeasesSchema } from './shema/leases.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Leases.name,
        schema: LeasesSchema,
      },
    ]),
  ],
  controllers: [LeasesController],
  providers: [LeasesService],
})
export class LeasesModule {}
