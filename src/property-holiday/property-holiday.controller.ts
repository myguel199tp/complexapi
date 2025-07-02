import { Controller, Get, Post, Body } from '@nestjs/common';
import { PropertyHolidayService } from './property-holiday.service';
import { CreatePropertyHolidayDto } from './dto/create-property-holiday.dto';

@Controller('property-holiday')
export class PropertyHolidayController {
  constructor(
    private readonly propertyHolidayService: PropertyHolidayService,
  ) {}

  @Post()
  create(@Body() createPropertyHolidayDto: CreatePropertyHolidayDto) {
    return this.propertyHolidayService.create(createPropertyHolidayDto);
  }

  @Get()
  findAll() {
    return this.propertyHolidayService.findAll();
  }
}
