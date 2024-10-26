/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateOfertDto } from './dto/create-ofert.dto';
import { Ofert, OfertDocument } from './shema/ofert.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OfertService {
  constructor(
    @InjectModel(Ofert.name) private ofertModule: Model<OfertDocument>,
  ) {}

  async create(createOfertDto: CreateOfertDto) {
    const ofertCrate = await this.ofertModule.create(createOfertDto);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.ofertModule.find({});
    return list;
  }
}
