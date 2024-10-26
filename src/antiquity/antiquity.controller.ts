import { Controller, Get, Post, Body } from '@nestjs/common';
import { AntiquityService } from './antiquity.service';
import { CreateAntiquityDto } from './dto/create-antiquity.dto';

@Controller('antiquity')
export class AntiquityController {
  constructor(private readonly antiquityService: AntiquityService) {}

  @Post()
  create(@Body() createAntiquityDto: CreateAntiquityDto) {
    return this.antiquityService.create(createAntiquityDto);
  }

  @Get()
  findAll() {
    return this.antiquityService.findAll();
  }
}
