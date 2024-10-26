/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PropertyTypeService } from './property-type.service';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('property-type')
@Controller('property-type')
export class PropertyTypeController {
  constructor(private readonly propertyTypeService: PropertyTypeService) {}

  @Post()
  create(@Body() createPropertyTypeDto: CreatePropertyTypeDto) {
    return this.propertyTypeService.create(createPropertyTypeDto);
  }

  @Get()
  findAll() {
    return this.propertyTypeService.findAll();
  }
}
