import { Injectable } from '@nestjs/common';
import { Antiquity } from './entities/antiquity.entity';
import { AntiquityDocument } from './shema/antiquity.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAntiquityDto } from './dto/create-antiquity.dto';

@Injectable()
export class AntiquityService {
  constructor(
    @InjectModel(Antiquity.name)
    private antiquityModule: Model<AntiquityDocument>,
  ) {}

  async create(createAntiquityDto: CreateAntiquityDto) {
    const ofertCrate = await this.antiquityModule.create(createAntiquityDto);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.antiquityModule.find({});
    return list;
  }
}
