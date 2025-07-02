/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Put,
  Delete,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateVenteDto } from './dto/create-vente.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('register-immueble')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear un nueva actividad' })
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
    @Body() createVenteDto: CreateVenteDto,
  ) {
    try {
      if (!files || files.length === 0) {
        throw new HttpException(
          'Al menos un archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      createVenteDto.files = files.map((file) => file.path);

      const newImmueble = await this.salesService.registerNew(createVenteDto);

      return {
        message: 'Registro exitoso',
        user: newImmueble,
      };
    } catch (error) {
      console.error('Error al registrar inmueble:', error);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error || 'No se pudo Registrar el inmueble',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('byAllData')
  findAllByAllMethods(
    @Query('ofert') ofert?: string,
    @Query('stratum') stratum?: string,
    @Query('iduser') iduser?: string,
    @Query('room') room?: string,
    @Query('restroom') restroom?: string,
    @Query('age') age?: string,
    @Query('parking') parking?: string,
    @Query('property') property?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('minArea') minArea?: string,
    @Query('maxArea') maxArea?: string,
  ) {
    return this.salesService.findAllByAllMethods(
      ofert,
      stratum,
      iduser,
      room,
      restroom,
      age,
      parking,
      property,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
    );
  }

  @Get('byuser')
  findOne(@Query('iduser') iduser?: string) {
    return this.salesService.findAllByUser(iduser);
  }

  @Get('inmovable')
  find(@Query('_id') _id?: string) {
    return this.salesService.findOneByImmovable(_id);
  }

  @Get('byProperty/:property')
  findAllByProperty(@Param('property') property: string) {
    return this.salesService.findAllByProperty(property);
  }

  @Get('byProperty/:ofert')
  findAllByOfert(@Param('ofert') ofert: string) {
    return this.salesService.findAllByOfert(ofert);
  }

  @Put(':_id')
  update(@Param('_id') _id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(_id, updateSaleDto);
  }

  @Delete(':id')
  delete(@Param('id') _id: string) {
    return this.salesService.delete(_id);
  }
}
