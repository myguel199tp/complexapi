/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { CreateRestroomDto } from './dto/create-restroom.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('restroom')
@Controller('restroom')
export class RestroomController {
  constructor(private readonly restroomService: RestroomService) {}

  @Post('creationRestroom')
  create(@Body() createRestroomDto: CreateRestroomDto) {
    return this.restroomService.create(createRestroomDto);
  }

  @Get()
  findAll() {
    return this.restroomService.findAll();
  }
}
