/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';
import { diskStorage } from 'multer';
import { File } from './dto/create-lease.dto';
import { extname } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

// const storage = diskStorage({
//   destination: './upload',
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const extension = extname(file.originalname);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
//   },
// });

@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Post('uploadcrate')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      // storage: storage,
    }),
  )
  async create(@Body() leasesService: CreateLeaseDto) {
    leasesService.file = this.mapFilesInfo(leasesService.file);

    return this.leasesService.create(leasesService);
  }

  private mapFilesInfo(pictures: File[]): File[] {
    return pictures.map((file) => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
    }));
  }

  @Get()
  findAll() {
    return this.leasesService.findAll();
  }

  @Get('byAllData')
  findAllByAllMethods(
    @Query('stratum') stratum?: string,
    @Query('room') room?: string,
    @Query('restroom') restroom?: string,
    @Query('age') age?: string,
    @Query('parking') parking?: string,
    @Query('property') property?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('minArea') minArea?: number,
    @Query('maxArea') maxArea?: number,
  ) {
    return this.leasesService.findAllByAllMethods(
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

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.leasesService.findOne(_id);
  }

  @Put(':id')
  update(@Param('id') _id: string, @Body() updateLeaseDto: UpdateLeaseDto) {
    return this.leasesService.update(_id, updateLeaseDto);
  }

  @Delete(':id')
  delete(@Param('id') _id: string) {
    return this.leasesService.delete(_id);
  }
}
