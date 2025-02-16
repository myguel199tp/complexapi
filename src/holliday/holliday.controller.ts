import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreateFileHollidayDto } from './dto/create-file.dto';
import { HollidayService } from './holliday.service';
import { CreateHollidayDto } from './dto/create-holliday.dto';

@ApiTags('hollidays')
@Controller('hollidays')
export class HollidayController {
  constructor(private readonly hollidayService: HollidayService) {}

  @Post('create-holliday')
  @ApiOperation({ summary: 'Crear un nuevo dato' })
  @HttpCode(HttpStatus.CREATED)
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
  async createHolliday(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateHollidayDto,
  ): Promise<
    {
      files: {
        originalname: string;
        filename: string;
        mimetype: string;
        size: number;
        _id: string;
        __v: number;
      }[];
      nameUnit: string;
      apartment: string;
      neigborhood: string;
      city: string;
      country: string;
      address: string;
      name: string;
    }[]
  > {
    try {
      if (!files || files.length === 0) {
        throw new HttpException(
          'No se encontró ningún archivo.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createFileHollidayDto: CreateFileHollidayDto = {
        files: files,
        nameUnit: body.nameUnit,
        apartment: body.apartment,
        neigborhood: body.neigborhood,
        city: body.city,
        country: body.country,
        address: body.address,
        name: body.name,
      };

      const response = await this.hollidayService.uploadFiles(
        createFileHollidayDto,
      );

      const formattedHollydaiResponse = [
        {
          files: response.files.map((file) => ({
            originalname: file.originalname,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
            _id: file._id,
            __v: file.__v,
          })),
          nameUnit: response.nameUnit,
          apartment: response.apartment,
          neigborhood: response.neigborhood,
          city: response.city,
          country: response.country,
          address: response.address,
          name: response.name,
        },
      ];

      return formattedHollydaiResponse;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `Error al subir los archivos: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
