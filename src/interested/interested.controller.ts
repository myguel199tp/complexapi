import { Controller, Get, Post, Body } from '@nestjs/common';
import { InterestedService } from './interested.service';
import { CreateInterestedDto } from './dto/create-interested.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('interested')
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
