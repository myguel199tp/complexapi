/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';
import { Leases, LeasesDocument } from './shema/leases.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LeasesService {
  constructor(
    @InjectModel(Leases.name) private leasesModule: Model<LeasesDocument>,
  ) {}

  async create(createLeaseDto: CreateLeaseDto) {
    try {
      const sale = new this.leasesModule(createLeaseDto);

      const createdLease = await sale.save();

      return createdLease;
    } catch (error) {
      console.error('Error al crear la venta:', error.message);
      throw error;
    }
  }

  async findAll() {
    const list = await this.leasesModule.find({});
    return list;
  }

  async findAllByAllMethods(
    stratum?: string,
    room?: string,
    restroom?: string,
    age?: string,
    parking?: string,
    property?: string,
    minPrice?: number,
    maxPrice?: number,
    minArea?: number,
    maxArea?: number,
  ) {
    const query: any = {};

    if (stratum !== undefined) {
      query.stratum = stratum;
    }

    if (room !== undefined) {
      query.room = room;
    }

    if (restroom !== undefined) {
      query.restroom = restroom;
    }

    if (age !== undefined) {
      query.age = age;
    }

    if (parking !== undefined) {
      query.parking = parking;
    }

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

    if (minArea !== undefined) {
      query.area = { $gte: minArea };
    }

    if (maxArea !== undefined) {
      if (query.area) {
        query.area.$lte = maxArea;
      } else {
        query.area = { $lte: maxArea };
      }
    }

    const list = await this.leasesModule.find(query).exec();
    return list;
  }

  async findOne(_id: string) {
    const findone = await this.leasesModule.findById(_id);
    return findone;
  }

  async update(_id: string, updateLeaseDto: UpdateLeaseDto) {
    const update = await this.leasesModule.findByIdAndUpdate(
      _id,
      updateLeaseDto,
    );
    return update;
  }

  async delete(_id: string) {
    const remove = await this.leasesModule.findByIdAndDelete(_id);
    return remove;
  }
}
