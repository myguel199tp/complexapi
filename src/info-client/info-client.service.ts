import { Injectable } from '@nestjs/common';
import { CreateInfoClientDto } from './dto/create-info-client.dto';
import { UpdateInfoClientDto } from './dto/update-info-client.dto';

@Injectable()
export class InfoClientService {
  create(createInfoClientDto: CreateInfoClientDto) {
    return 'This action adds a new infoClient';
  }

  findAll() {
    return `This action returns all infoClient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infoClient`;
  }

  update(id: number, updateInfoClientDto: UpdateInfoClientDto) {
    return `This action updates a #${id} infoClient`;
  }

  remove(id: number) {
    return `This action removes a #${id} infoClient`;
  }
}
