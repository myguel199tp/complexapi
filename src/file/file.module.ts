/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileSchema } from './shema/file.shema';
import { FileService } from './file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
