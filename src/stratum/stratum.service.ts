import { Injectable } from '@nestjs/common';
import { CreateStratumDto } from './dto/create-stratum.dto';
import { Stratum, StratumDocument } from './shema/stratum.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StratumService {
  constructor(
    @InjectModel(Stratum.name) private stratumModule: Model<StratumDocument>,
  ) {}

  async create(createStratumDto: CreateStratumDto) {
    const ofertCrate = await this.stratumModule.create(createStratumDto);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.stratumModule.find({});
    return list;
  }
}
