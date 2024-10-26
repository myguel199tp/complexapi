/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { CreateVenteDto } from './dto/create-vente.dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { diskStorage } from 'multer';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('uploadcrate')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          const originalnameWithoutExtension = file.originalname
            .split('.')
            .slice(0, -1)
            .join('.');
          const filename = `${originalnameWithoutExtension}.${file.originalname
            .split('.')
            .pop()}`;
          console.log({ filename });
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
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateVenteDto,
  ) {
    try {
      if (!files || files.length === 0) {
        throw new HttpException(
          'No se encontró ningún archivo.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createSaleDto: CreateSaleDto = {
        files: files,
        iduser: body.iduser,
        ofert: body.ofert,
        email: body.email,
        phone: body.phone,
        parking: body.parking,
        neighborhood: body.neighborhood,
        country: body.country,
        city: body.city,
        property: body.property,
        stratum: body.stratum,
        price: body.price,
        room: body.room,
        restroom: body.restroom,
        age: body.age,
        administration: body.administration,
        area: body.area,
        description: body.description,
        created_at: body.created_at,
        finished_at: body.finished_at
      };

      const response = await this.salesService.uploadFiles(createSaleDto);

      const formattedResponse = [
        {
          files: response.files.map((file) => ({
            originalname: file.originalname,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
            _id: file._id,
            __v: file.__v,
          })),
          ofert: response.ofert,
          iduser: response.iduser,
          email: response.email,
          phone: response.phone,
          parking: response.parking,
          neighborhood: response.neighborhood,
          country: response.country,
          city: response.city,
          property: response.property,
          stratum: response.stratum,
          price: response.price,
          room: response.room,
          restroom: response.restroom,
          age: response.age,
          administration: response.administration,
          area: response.area,
          description: response.description,
          created_at: response.created_at,
          finished_at: response.finished_at
        },
      ];

      return formattedResponse;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw new HttpException(
        'Error al subir los archivos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('byAllData')
  findAllByAllMethods(
    @Query('stratum') stratum?: string,
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
      stratum,
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
    return this.salesService.findAllByAllMethods(iduser);
  }


  @Get('byProperty/:property')
  findAllByProperty(@Param('property') property: string) {
    return this.salesService.findAllByProperty(property);
  }

  @Get('byProperty/:ofert')
  findAllByOfert(@Param('ofert') ofert: string) {
    return this.salesService.findAllByOfert(ofert);
  }

  @Put(':id')
  update(@Param('id') _id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(_id, updateSaleDto);
  }

  @Delete(':id')
  delete(@Param('id') _id: string) {
    return this.salesService.delete(_id);
  }
}
