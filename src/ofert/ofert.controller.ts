/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OfertService } from './ofert.service';
import { CreateOfertDto } from './dto/create-ofert.dto';

@Controller('ofert')
export class OfertController {
  constructor(private readonly ofertService: OfertService) {}

  @Post()
  create(@Body() createOfertDto: CreateOfertDto) {
    return this.ofertService.create(createOfertDto);
  }

  @Get()
  findAll() {
    return this.ofertService.findAll();
  }
}
