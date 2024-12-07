/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  BadRequestException,
  HttpCode,
  HttpStatus,
  HttpException,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateSaleDto } from 'src/sales/dto/create-sale.dto';
import { CreateFileDto } from 'src/file/dto/create-file.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  create(dto: RegisterAuthDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly authService: AuthService) {}

  @Get('allUser')
  findAll() {
    return this.authService.findAll();
  }

  @Get('allUser/:id')
  findOne(@Param('id') _id: string) {
    return this.authService.findOne(_id);
  }

  @Post('register')
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
    @Body() registerAuthDto: RegisterAuthDto,
  ) {
    try {
      if (!file) {
        throw new HttpException(
          'El archivo es obligatorio.',
          HttpStatus.BAD_REQUEST,
        );
      }

      registerAuthDto.file = file.path;

      const result = await this.authService.register(registerAuthDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo registrar el usuario',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':_id/sales')
  addSaleToUser(
    @Param('_id') userId: string,
    @Body() createSaleDto: CreateSaleDto,
  ) {
    return this.authService.addSaleToUser(userId, createSaleDto);
  }

  @Post(':_id/commerce')
  addCommerceToUser(
    @Param('_id') userId: string,
    @Body() createFileDto: CreateFileDto,
  ) {
    return this.authService.addCommerceToUser(userId, createFileDto);
  }

  @Post('login')
  async loginUser(@Body() userObjectLogin: LoginAuthDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(userObjectLogin);

      return res.status(HttpStatus.OK).json({
        success: true,
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.getStatus()).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error interno al procesar el login',
      });
    }
  }
}
