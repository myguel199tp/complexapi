import { Controller, Get, Post, Body } from '@nestjs/common';
import { InterestedService } from './interested.service';
import { CreateInterestedDto } from './dto/create-interested.dto';

@Controller('interested')
export class InterestedController {
  constructor(private readonly interestedService: InterestedService) {}

  @Post('creationInterested')
  create(@Body() createInterestedDto: CreateInterestedDto) {
    return this.interestedService.create(createInterestedDto);
  }

  @Get()
  findAll() {
    return this.interestedService.findAll();
  }
}
