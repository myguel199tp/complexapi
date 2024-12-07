/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @ApiOperation({ summary: 'Crear un nuevo usuario' })
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Body() createUserDto: CreateUserDto) {
  //   try {
  //     const result = await this.usersService.create(createUserDto);
  //     return result;
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         error: 'No se pudo crear el registro de usuario',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  @Post()
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
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      // Validar si el archivo fue subido
      if (!file) {
        throw new HttpException(
          'El archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Asignar la ruta del archivo al DTO
      createUserDto.file = file.path; // Ruta completa o `file.filename` si es solo el nombre

      const result = await this.usersService.create(createUserDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear el registro de usuario',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id/sales')
  addSaleToUser(@Param('id') userId: string) {
    return this.usersService.addSaleToUser(+userId);
  }

  @Post(':id/commerce')
  addCommerceToUser(@Param('_id') userId: string) {
    return this.usersService.addCommerceToUser(userId);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
