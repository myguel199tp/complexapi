import { Injectable } from '@nestjs/common';
import { CreatePropertyHolidayDto } from './dto/create-property-holiday.dto';
import { UpdatePropertyHolidayDto } from './dto/update-property-holiday.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyHoliday } from './entities/property-holiday.entity';
import { PropertyHolidayDocument } from './shema/property-holiday.shema';
import { Model } from 'mongoose';

@Injectable()
export class PropertyHolidayService {
  constructor(
    @InjectModel(PropertyHoliday.name)
    private PropertyHolidayModule: Model<PropertyHolidayDocument>,
  ) {}
  async create(CreatePropertyholidayDto: CreatePropertyHolidayDto) {
    const ofertholidayCrate = await this.PropertyHolidayModule.create(
      CreatePropertyholidayDto,
    );
    return ofertholidayCrate;
  }

  async findAll() {
    const list = await this.PropertyHolidayModule.find({});
    return list;
  }
}
