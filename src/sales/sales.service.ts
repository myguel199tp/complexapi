/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sales, SalesDocument } from './shema/sales.shema';
import { Model } from 'mongoose';
import { CreateVenteDto } from './dto/create-vente.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sales.name)
    private salesModule: Model<SalesDocument>,
  ) {}
  async registerNew(createVenteDto: CreateVenteDto): Promise<any> {
    try {
      const salesUser = new this.salesModule({
        ...createVenteDto,
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
    ofert?: string,
    stratum?: string,
    iduser?: string,
    room?: string,
    restroom?: string,
    age?: string,
    parking?: string,
    property?: string,
    minPrice?: string,
    maxPrice?: string,
    minArea?: string,
    maxArea?: string,
  ) {
    const query: any = {};

    if (ofert !== undefined) {
      query.ofert = ofert;
    }

    if (stratum !== undefined) {
      query.stratum = stratum;
    }

    if (iduser !== undefined) {
      query.iduser = iduser;
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

    const list = await this.salesModule.find(query).exec();
    return list;
  }

  async find(_id?: any) {
    const query: any = {};

    if (_id !== undefined) {
      query._id = _id;
    }

    const result = await this.salesModule.findOne(query).exec();
    return result;
  }

  async findAllByProperty(property: string) {
    const list = await this.salesModule.find({ property });
    return list;
  }

  async findAllByOfert(ofert: string) {
    const list = await this.salesModule.find({ ofert });
    return list;
  }

  async update(_id: string, updateSaleDto: UpdateSaleDto) {
    const update = await this.salesModule.findByIdAndUpdate(_id, updateSaleDto);
    return update;
  }

  async delete(_id: string) {
    const remove = await this.salesModule.findByIdAndDelete(_id);
    return remove;
  }
}
