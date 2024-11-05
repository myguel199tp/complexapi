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
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('parking')
@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo parking' })
  @ApiBody({ type: CreateParkingDto, description: 'Datos del nuevo parking' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createParkingDto: CreateParkingDto) {
    try {
      const result = await this.parkingService.create(createParkingDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear el registro de parqueo',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener parkings por filtros' })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Nombre del parking',
  })
  @ApiQuery({
    name: 'location',
    type: String,
    required: false,
    description: 'Ubicación del parking',
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.parkingService.findAll();
  }
}
