import { Module } from '@nestjs/common';
import { StratumService } from './stratum.service';
import { StratumController } from './stratum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stratum, StratumSchema } from './shema/stratum.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Stratum.name,
        schema: StratumSchema,
      },
    ]),
  ],
  controllers: [StratumController],
  providers: [StratumService],
})
export class StratumModule {}
