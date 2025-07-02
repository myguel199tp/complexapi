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
  UploadedFile,
  Param,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Crear una nueva actividad' })
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
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() createActivityDto: CreateActivityDto,
    @Req() req: any,
  ) {
    try {
      if (!file) {
        throw new HttpException(
          'El archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Agregar la ruta del archivo subido
      createActivityDto.file = file.path;

      // Agregar el nit del conjunto desde el JWT
      createActivityDto.nit = req.user.nit;

      const newActivity = await this.activitiesService.registerActivity(
        createActivityDto,
      );

      return {
        message: 'Actividad creada de forma exitosa',
        activity: newActivity,
      };
    } catch (error) {
      console.error('Error al registrar actividad:', error);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear la actividad',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('allActivities')
  @Roles('admins')
  async findAllActivities(@Req() req: any) {
    const nit = req.user.nit; // ✅ lo tomas del JWT
    return this.activitiesService.findAll(nit);
  }

  @Patch('update-activity/:id')
  @ApiOperation({ summary: 'Actualizar una actividad existente' })
  @HttpCode(HttpStatus.OK)
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
        if (file && !file.originalname.match(/\.(jpg|jpeg|png)$/)) {
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
  async updateActivity(
    @Param('_id') _id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateActivityDto: CreateActivityDto,
  ) {
    try {
      if (file) {
        updateActivityDto.file = file.path;
      }

      const updated = await this.activitiesService.update(
        _id,
        updateActivityDto,
      );

      return {
        message: 'Actividad actualizada con éxito',
        data: updated,
      };
    } catch (error) {
      console.error('Error al actualizar actividad:', error);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error || 'No se pudo actualizar la actividad',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
