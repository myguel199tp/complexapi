import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHollidayDto } from './dto/create-holliday.dto';
import { CreateFileHollidayDto } from './dto/create-file.dto';
import { Holliday, HollidayDocument } from './shema/holliday.shema';

@Injectable()
export class HollidayService {
  constructor(
    @InjectModel(Holliday.name) private hollidayModel: Model<HollidayDocument>,
  ) {}

  async uploadFiles(createFileHollidayDto: CreateFileHollidayDto): Promise<{
    files: {
      originalname: string;
      filename: string;
      mimetype: string;
      size: number;
      _id: string;
      __v: number;
    }[];
    nameUnit: string;
    apartment: string;
    neigborhood: string;
    city: string;
    country: string;
    address: string;
    name: string;
    cel: string;
    price: string;
    status: boolean;
    maxGuests: number;
    parking: boolean;
    petsAllowed: boolean;
    ruleshome: string;
    description: string;
  }> {
    try {
      const filesData = createFileHollidayDto.files.map((file) => ({
        originalname: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      }));

      const fileInstance = new this.hollidayModel({
        files: filesData,
        nameUnit: createFileHollidayDto.nameUnit,
        apartment: createFileHollidayDto.apartment,
        neigborhood: createFileHollidayDto.neigborhood,
        city: createFileHollidayDto.city,
        country: createFileHollidayDto.country,
        address: createFileHollidayDto.address,
        name: createFileHollidayDto.name,
        cel: createFileHollidayDto.cel,
        price: createFileHollidayDto.price,
        status: createFileHollidayDto.status,
        maxGuests: createFileHollidayDto.maxGuests,
        parking: createFileHollidayDto.parking,
        petsAllowed: createFileHollidayDto.petsAllowed,
        ruleshome: createFileHollidayDto.ruleshome,
        description: createFileHollidayDto.description,
      });

      const savedFile = await fileInstance.save();

      const result = {
        files: savedFile.files.map((file) => ({
          originalname: file.originalname,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          _id: file._id,
          __v: file.__v,
        })),
        nameUnit: savedFile.nameUnit,
        apartment: savedFile.apartment,
        neigborhood: savedFile.neigborhood,
        city: savedFile.city,
        country: savedFile.country,
        address: savedFile.address,
        name: savedFile.name,
        cel: savedFile.cel,
        price: savedFile.price,
        status: savedFile.status,
        maxGuests: savedFile.maxGuests,
        parking: savedFile.parking,
        petsAllowed: savedFile.petsAllowed,
        ruleshome: savedFile.ruleshome,
        description: savedFile.description,
      };

      return result;
    } catch (error) {
      throw new Error(
        `Error al guardar los archivos en la base de datos: ${error}`,
      );
    }
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
