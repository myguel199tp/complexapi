/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { Speciality, SpecialityDocument } from './shema/specialite.shema';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectModel(Speciality.name)
    private specialityModule: Model<SpecialityDocument>,
  ) {}

  async create(createSpecialityDto: CreateSpecialityDto) {
    const ofertCrate = await this.specialityModule.create(createSpecialityDto);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.specialityModule.find({});
    return list;
  }
}
