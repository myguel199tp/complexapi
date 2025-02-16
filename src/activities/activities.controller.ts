import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('antiquity')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nueva actividad' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createActivityDto: CreateActivityDto) {
    try {
      const result = await this.activitiesService.create(createActivityDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear la actividad',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener actividad por filtros' })
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
    return this.activitiesService.findAll();
  }
}
