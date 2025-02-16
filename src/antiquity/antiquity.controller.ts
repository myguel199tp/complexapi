import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AntiquityService } from './antiquity.service';
import { CreateAntiquityDto } from './dto/create-antiquity.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('antiquity')
@Controller('antiquity')
export class AntiquityController {
  constructor(private readonly antiquityService: AntiquityService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo valor de antiguedad' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAntiquityDto: CreateAntiquityDto) {
    try {
      const result = await this.antiquityService.create(createAntiquityDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear el registro de antiguedad',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener antiguedad por filtros' })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Nombre de antiguedad',
  })
  @ApiQuery({
    name: 'location',
    type: String,
    required: false,
    description: 'Ubicación de antiguedad',
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.antiquityService.findAll();
  }
}
