import { Module } from '@nestjs/common';
import { InfoClientService } from './info-client.service';
import { InfoClientController } from './info-client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoClient, InfoClientSchema } from './shema/info-client.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InfoClient.name,
        schema: InfoClientSchema,
      },
    ]),
  ],
  controllers: [InfoClientController],
  providers: [InfoClientService],
})
export class InfoClientModule {}
