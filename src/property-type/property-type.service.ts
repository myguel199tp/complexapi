/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PropertyType,
  PropertyTypeDocument,
} from './shema/property-type.shema';

@Injectable()
export class PropertyTypeService {
  constructor(
    @InjectModel(PropertyType.name)
    private PropertyTypeModule: Model<PropertyTypeDocument>,
  ) {}

  async create(createPropertyTypeDto: CreatePropertyTypeDto) {
    const ofertCrate = await this.PropertyTypeModule.create(
      createPropertyTypeDto,
    );
    return ofertCrate;
  }

  async findAll() {
    const list = await this.PropertyTypeModule.find({});
    return list;
  }
}
