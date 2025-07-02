import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './shema/record.shema';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/pdfs',
    }),
    MongooseModule.forFeature([
      {
        name: Record.name,
        schema: RecordSchema,
      },
    ]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
