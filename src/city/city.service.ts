import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { City, CityDocument } from './shema/city.shema';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const createdCity = new this.cityModel(createCityDto);
    return createdCity.save();
  }

  async findAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }
}
