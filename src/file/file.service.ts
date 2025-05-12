/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './shema/file.shema';
import { CreateCommerceDto } from './dto/create-commerce.dto';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async registerNew(createCommerceDto: CreateCommerceDto): Promise<any> {
    try {
      const salesUser = new this.fileModel({
        ...createCommerceDto,
      });

      return await salesUser.save();
    } catch (error) {
      throw new HttpException(
        `Error al registrar el actividad: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAllByAllMethods(
    names?: string,
    contact?: string,
    typeService?: string,
  ) {
    const query: any = {};

    if (names !== undefined) {
      query.stratum = names;
    }

    if (contact !== undefined) {
      query.room = contact;
    }

    if (typeService !== undefined) {
      query.restroom = typeService;
    }

    const list = await this.fileModel.find(query).exec();
    return list;
  }

  async findAllByUser(iduser?: string) {
    const query: any = {};

    if (iduser !== undefined) {
      query.iduser = iduser;
    }

    const list = await this.fileModel.find(query).exec();
    return list;
  }
}
