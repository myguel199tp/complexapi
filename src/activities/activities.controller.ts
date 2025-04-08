import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
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
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const originalName = file.originalname
            .split('.')
            .slice(0, -1)
            .join('.');
          const fileExt = file.originalname.split('.').pop();
          const filename = `${originalName}-${Date.now()}.${fileExt}`;
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
  @HttpCode(HttpStatus.CREATED)
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    try {
      if (!file) {
        throw new HttpException(
          'El archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      createActivityDto.file = file.path;
      const newActivity = await this.activitiesService.registerNew(
        createActivityDto,
      );

      return {
        message: 'Actividad registrada de forma exitosa',
        user: newActivity,
      };
    } catch (error) {
      console.error('Error al registrar usuario:', error);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error || 'No se pudo Registrar al visitante',
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
