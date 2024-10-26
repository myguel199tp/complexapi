import { Injectable } from '@nestjs/common';
import { CreateInterestedDto } from './dto/create-interested.dto';
import { Interested, InterestedDocument } from './shema/interested.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InterestedService {
  constructor(
    @InjectModel(Interested.name)
    private interestedModule: Model<InterestedDocument>,
  ) {}

  async create(createInterestedDto: CreateInterestedDto) {
    const ofertCrate = await this.interestedModule.create(createInterestedDto);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.interestedModule.find({});
    return list;
  }
}
