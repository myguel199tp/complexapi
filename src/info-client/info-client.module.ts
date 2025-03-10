import { Module } from '@nestjs/common';
import { InfoClientService } from './info-client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoClient, InfoClientSchema } from './shema/info-client.shema';
import { InfoClientController } from './info-client.controller';

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
