/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('creationRoom')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }
}
