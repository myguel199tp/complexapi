/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateSaleDto } from 'src/sales/dto/create-sale.dto';
import { CreateFileDto } from 'src/file/dto/create-file.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':id/sales') // Endpoint para agregar una venta a un usuario
  addSaleToUser(
    @Param('id') userId: string
  ) {
    return this.usersService.addSaleToUser(+userId);
  }

  @Post(':id/commerce')
  addCommerceToUser(
    @Param('_id') userId: string,
  ) {
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
