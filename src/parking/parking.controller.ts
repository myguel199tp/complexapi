/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.create(createParkingDto);
  }

  @Get()
  findAll() {
    return this.parkingService.findAll();
  }
}
