import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ReservationActivityService } from './reservation-activity.service';
import { ReservationActivityDto } from './dto/create-reservation-activity.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('reservation-activity')
@Controller('reservation-activity')
@UseGuards(JwtAuthGuard)
export class ReservationActivityController {
  constructor(
    private readonly reservationActivityService: ReservationActivityService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo parking' })
  @ApiBody({
    type: ReservationActivityDto,
    description: 'Datos de la reserva',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() reservationActivityDto: ReservationActivityDto) {
    try {
      const result = await this.reservationActivityService.create(
        reservationActivityDto,
      );
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
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.reservationActivityService.findAll();
  }
}
