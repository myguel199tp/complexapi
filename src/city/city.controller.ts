import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('creationCity')
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }
}
