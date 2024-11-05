/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { OfertService } from './ofert.service';
import { CreateOfertDto } from './dto/create-ofert.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('ofert')
@Controller('ofert')
export class OfertController {
  constructor(private readonly ofertService: OfertService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nueva oferta' })
  @ApiBody({ type: CreateOfertDto, description: 'Datos de la oferta' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOfertDto: CreateOfertDto) {
    try {
      const result = await this.ofertService.create(createOfertDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear la oferta',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.ofertService.findAll();
  }
}
