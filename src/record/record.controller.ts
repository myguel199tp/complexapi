import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear un nuevo documento' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/pdfs',
        filename: (req, file, cb) => {
          const fileExt = extname(file.originalname); // .pdf
          const name = file.originalname
            .replace(fileExt, '')
            .replace(/\s/g, '_');
          const filename = `${name}-${Date.now()}${fileExt}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        const isPdf =
          file.mimetype === 'application/pdf' &&
          file.originalname.toLowerCase().endsWith('.pdf');

        if (!isPdf) {
          return cb(
            new HttpException(
              'Solo se permiten archivos PDF',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  async uploadPdf(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPdfDto: CreateRecordDto,
  ) {
    if (!file) {
      throw new HttpException(
        'El archivo PDF es obligatorio',
        HttpStatus.BAD_REQUEST,
      );
    }

    createPdfDto.file = file.path; // o file.filename si prefieres guardar solo el nombre

    const createdPdf = await this.recordService.create(createPdfDto);
    return {
      message: 'Archivo PDF subido con éxito',
      data: createdPdf,
    };
  }
}
