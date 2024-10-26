/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './shema/room.shema';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModule: Model<RoomDocument>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const ofertCrate = await this.roomModule.create(createRoomDto);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.roomModule.find({});
    return list;
  }
}
