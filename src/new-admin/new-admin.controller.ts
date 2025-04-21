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
  HttpCode,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { NewAdminService } from './new-admin.service';
import { CreateNewAdminDto } from './dto/create-new-admin.dto';
import { UpdateNewAdminDto } from './dto/update-new-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('new-admin')
@Controller('new-admin')
@UseGuards(JwtAuthGuard)
export class NewAdminController {
  constructor(private readonly newAdminService: NewAdminService) {}

  @Post('register-admin')
  @ApiOperation({ summary: 'Crear un nueva noticia' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles('admins', 'porteria')
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
    @Body() createNewAdminDto: CreateNewAdminDto,
  ) {
    try {
      if (!file) {
        throw new HttpException(
          'El archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      createNewAdminDto.file = file.path;
      const newAdmin = await this.newAdminService.registerNew(
        createNewAdminDto,
      );

      return {
        message: 'Noticia creada de forma exitosa',
        user: newAdmin,
      };
    } catch (error) {
      console.error('Error al registrar usuario:', error);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error || 'No se pudo crear la noticia',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('allNews')
  findAllWithoutFilter() {
    return this.newAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newAdminService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewAdminDto: UpdateNewAdminDto,
  ) {
    return this.newAdminService.update(+id, updateNewAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newAdminService.remove(+id);
  }
}
