/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CreateCommerceDto } from './dto/create-commerce.dto';

@Controller('commerces')
export class CommercesController {
  constructor(private readonly commercesService: CommercesService) {}

  @Post()
  create(@Body() createCommerceDto: CreateCommerceDto) {
    return this.commercesService.create(createCommerceDto);
  }

  @Get()
  findAll() {
    return this.commercesService.findAll();
  }
}
