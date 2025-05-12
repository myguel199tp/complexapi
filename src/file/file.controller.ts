/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UploadedFiles,
  Body,
  Get,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('uploads')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear un nuevo dato' })
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
    @Body() createCommerceDto: CreateCommerceDto,
  ) {
    try {
      if (!files || files.length === 0) {
        throw new HttpException(
          'Al menos un archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      createCommerceDto.files = files.map((file) => file.path);

      const newFile = await this.fileService.registerNew(createCommerceDto);

      return {
        message: 'Registro exitoso',
        user: newFile,
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
    @Query('names') names?: string,
    @Query('contact') contact?: string,
    @Query('typeService') typeService?: string,
  ) {
    return this.fileService.findAllByAllMethods(names, contact, typeService);
  }

  @Get('byuser')
  findOne(@Query('iduser') iduser?: string) {
    return this.fileService.findAllByUser(iduser);
  }
}
