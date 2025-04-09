import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import * as path from 'path';

@ApiTags('activities')
@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('register-activity')
  @ApiOperation({ summary: 'Crear un nueva actividad' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles('admins')
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
    @Body() createActivityDto: CreateActivityDto,
  ) {
    try {
      if (!files || files.length === 0) {
        throw new HttpException(
          'Al menos un archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Puedes guardar todas las rutas en un array
      createActivityDto.files = files.map((file) => file.path);

      const newActivity = await this.activitiesService.registerNew(
        createActivityDto,
      );

      return {
        message: 'Actividad registrada de forma exitosa',
        user: newActivity,
      };
    } catch (error) {
      console.error('Error al registrar actividad:', error);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error || 'No se pudo Registrar la actividad',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('allActivities')
  findAllWithoutFilter() {
    return this.activitiesService.findAll();
  }
}
