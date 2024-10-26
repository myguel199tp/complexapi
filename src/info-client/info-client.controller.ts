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
import { InfoClientService } from './info-client.service';
import { CreateInfoClientDto } from './dto/create-info-client.dto';
import { UpdateInfoClientDto } from './dto/update-info-client.dto';

@Controller('info-client')
export class InfoClientController {
  constructor(private readonly infoClientService: InfoClientService) {}

  @Post()
  create(@Body() createInfoClientDto: CreateInfoClientDto) {
    return this.infoClientService.create(createInfoClientDto);
  }

  @Get()
  findAll() {
    return this.infoClientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infoClientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInfoClientDto: UpdateInfoClientDto,
  ) {
    return this.infoClientService.update(+id, updateInfoClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoClientService.remove(+id);
  }
}
