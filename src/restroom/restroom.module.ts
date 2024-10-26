import { Module } from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { RestroomController } from './restroom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restroom } from './entities/restroom.entity';
import { RestroomSchema } from './shema/restroom.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restroom.name,
        schema: RestroomSchema,
      },
    ]),
  ],
  controllers: [RestroomController],
  providers: [RestroomService],
})
export class RestroomModule {}
