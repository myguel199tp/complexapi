/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRestroomDto } from './dto/create-restroom.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restroom, RestroomDocument } from './shema/restroom.shema';

@Injectable()
export class RestroomService {
  constructor(
    @InjectModel(Restroom.name) private restroomModule: Model<RestroomDocument>,
  ) {}

  async create(restroomModule: CreateRestroomDto) {
    const ofertCrate = await this.restroomModule.create(restroomModule);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.restroomModule.find({});
    return list;
  }
}
