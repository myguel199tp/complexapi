/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { Model } from 'mongoose';
import { CommerceDocument, Commerce } from './shema/commerce.shema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommercesService {
  constructor(
    @InjectModel(Commerce.name) private commerceModule: Model<CommerceDocument>,
  ) {}

  async create(commerceModule: CreateCommerceDto) {
    const ofertCrate = await this.commerceModule.create(commerceModule);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.commerceModule.find({});
    return list;
  }
}
