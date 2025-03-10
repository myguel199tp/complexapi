import { Module } from '@nestjs/common';
import { NewAdminService } from './new-admin.service';
import { NewAdminController } from './new-admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoNewAdmin, InfoNewAdminSchema } from './shema/info-new-admin.shema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([
      {
        name: InfoNewAdmin.name,
        schema: InfoNewAdminSchema,
      },
    ]),
  ],

  controllers: [NewAdminController],
  providers: [NewAdminService],
})
export class NewAdminModule {}
