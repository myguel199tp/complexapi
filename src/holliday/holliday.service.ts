import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHollidayDto } from './dto/create-holliday.dto';
import { Holliday, HollidayDocument } from './shema/holliday.shema';

@Injectable()
export class HollidayService {
  constructor(
    @InjectModel(Holliday.name) private hollidayModel: Model<HollidayDocument>,
  ) {}

  async registerNew(createHollidayDto: CreateHollidayDto): Promise<any> {
    try {
      const visitUser = new this.hollidayModel({
        ...createHollidayDto,
      });

      return await visitUser.save();
    } catch (error) {
      throw new HttpException(
        `Error al registrar el holiday: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllByAllMethods(
    property?: string,
    minPrice?: string,
    maxPrice?: string,
  ) {
    const query: any = {};

    if (property !== undefined) {
      query.property = property;
    }

    if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    }

    if (maxPrice !== undefined) {
      if (query.price) {
        query.price.$lte = maxPrice;
      } else {
        query.price = { $lte: maxPrice };
      }
    }

    const list = await this.hollidayModel.find(query).exec();
    return list;
  }

  async findAll(): Promise<Holliday[]> {
    return this.hollidayModel.find().exec();
  }

  async findOne(id: string): Promise<Holliday> {
    return this.hollidayModel.findById(id).exec();
  }

  async update(
    id: string,
    updateHollidayDto: Partial<CreateHollidayDto>,
  ): Promise<Holliday> {
    return this.hollidayModel
      .findByIdAndUpdate(id, updateHollidayDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Holliday> {
    return this.hollidayModel.findByIdAndDelete(id).exec();
  }
}
