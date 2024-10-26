/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('speciality')
@Controller('speciality')
export class SpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}

  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialityService.create(createSpecialityDto);
  }

  @Get()
  findAll() {
    return this.specialityService.findAll();
  }
}
