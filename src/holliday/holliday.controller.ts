import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { HollidayService } from './holliday.service';
import { CreateHollidayDto } from './dto/create-holliday.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as path from 'path';

@ApiTags('hollidays')
@Controller('hollidays')
export class HollidayController {
  constructor(private readonly hollidayService: HollidayService) {}

  @Post('create-holliday')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear un nuevo hollyday' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = path.parse(file.originalname).name;
          const ext = path.extname(file.originalname);
          const filename = `${name}-${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new HttpException(
              'Solo se permiten archivos JPG o PNG',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async register(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createHollidayDto: CreateHollidayDto,
  ) {
    try {
      if (!files || files.length === 0) {
        throw new HttpException(
          'Al menos un archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Puedes guardar todas las rutas en un array
      createHollidayDto.files = files.map((file) => file.path);

      const newActivity = await this.hollidayService.registerNew(
        createHollidayDto,
      );

      return {
        message: 'Reserva registrada de forma exitosa',
        user: newActivity,
      };
    } catch (error) {
      console.error('Error al registrar Reserva:', error);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error || 'No se pudo Registrar la Reserva',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('byAllData')
  findAllByAllMethods(
    @Query('property') property?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.hollidayService.findAllByAllMethods(
      property,
      minPrice,
      maxPrice,
    );
  }

  @Get('byuser')
  findOne(@Query('iduser') iduser?: string) {
    return this.hollidayService.findAllByUser(iduser);
  }
}
