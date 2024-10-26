/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sales, SalesSchema } from './shema/sales.shema';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([
      {
        name: Sales.name,
        schema: SalesSchema,
      },
    ]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
