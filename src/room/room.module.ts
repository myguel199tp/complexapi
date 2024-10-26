/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './shema/room.shema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
