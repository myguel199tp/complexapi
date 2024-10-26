/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Parking, ParkingDocument } from './shema/parking.shema';
import { Model } from 'mongoose';

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel(Parking.name) private parkingModule: Model<ParkingDocument>,
  ) {}

  async create(parkingModule: CreateParkingDto) {
    const ofertCrate = await this.parkingModule.create(parkingModule);
    return ofertCrate;
  }

  async findAll() {
    const list = await this.parkingModule.find({});
    return list;
  }
}
