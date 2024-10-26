/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { StratumService } from './stratum.service';
import { CreateStratumDto } from './dto/create-stratum.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stratum')
@Controller('stratum')
export class StratumController {
  constructor(private readonly stratumService: StratumService) {}

  @Post()
  create(@Body() createStratumDto: CreateStratumDto) {
    return this.stratumService.create(createStratumDto);
  }

  @Get()
  findAll() {
    return this.stratumService.findAll();
  }
}
