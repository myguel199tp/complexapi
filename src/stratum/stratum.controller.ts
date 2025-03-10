import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { StratumService } from './stratum.service';
import { CreateStratumDto } from './dto/create-stratum.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('stratum')
@Controller('stratum')
export class StratumController {
  constructor(private readonly stratumService: StratumService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estrato' })
  @ApiBody({ type: CreateStratumDto, description: 'Datos del nuevo estrato' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createStratumDto: CreateStratumDto) {
    try {
      const result = await this.stratumService.create(createStratumDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear el registro de estrato',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.stratumService.findAll();
  }
}
