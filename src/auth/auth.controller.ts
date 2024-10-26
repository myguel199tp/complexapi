/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateSaleDto } from 'src/sales/dto/create-sale.dto';
import { CreateFileDto } from 'src/file/dto/create-file.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
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
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    if (registerAuthDto.termsConditions !== true) {
      throw new BadRequestException('You must accept terms and conditions.');
    }
    return this.authService.register(registerAuthDto);
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
  async loginUser(@Body() userObjectLogin: LoginAuthDto) {
    const result = await this.authService.login(userObjectLogin);
    return result;
  }
}
