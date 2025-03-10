import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from './shema/visit.shema';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([
      {
        name: Visit.name,
        schema: VisitSchema,
      },
    ]),
  ],

  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
