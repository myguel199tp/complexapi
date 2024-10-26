/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body} from '@nestjs/common';
import { RegisterComplexService } from './register-complex.service';
import { CreateRegisterComplexDto } from './dto/create-register-complex.dto';

@Controller('register-complex')
export class RegisterComplexController {
  constructor(private readonly registerComplexService: RegisterComplexService) {}

  @Post()
  create(@Body() createRegisterComplexDto: CreateRegisterComplexDto) {
    return this.registerComplexService.create(createRegisterComplexDto);
  }

  @Get()
  findAll() {
    return this.registerComplexService.findAll();
  }
}
