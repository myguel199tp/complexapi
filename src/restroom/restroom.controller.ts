import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { CreateRestroomDto } from './dto/create-restroom.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('restroom')
@Controller('restroom')
export class RestroomController {
  constructor(private readonly restroomService: RestroomService) {}

  @Post('creationRestroom')
  @ApiOperation({ summary: 'Crear un nuevo restroom' })
  @ApiBody({ type: CreateRestroomDto, description: 'Datos del nuevo restroom' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRestroomDto: CreateRestroomDto) {
    try {
      const result = await this.restroomService.create(createRestroomDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear el registro de baño',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.restroomService.findAll();
  }
}
