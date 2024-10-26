/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sales, SalesDocument } from './shema/sales.shema';
import { Model } from 'mongoose';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sales.name) private salesModule: Model<SalesDocument>,
  ) {}

  async uploadFiles(createSaleDto: CreateSaleDto): Promise<{
    files: {
      originalname: string;
      filename: string;
      mimetype: string;
      size: number;
      _id: number;
      __v: number;
    }[];
    iduser: string
    ofert: string;
    email: string;
    phone: string;
    parking: string;
    neighborhood: string;
    country: string;
    city: string;
    property: string;
    stratum: string;
    price: string;
    room: string;
    restroom: string;
    age: string;
    administration: string;
    area: string;
    description: string;
    created_at: Date,
    finished_at: Date
  }> {
    try {
      const filesData = createSaleDto.files.map((file) => ({
        originalname: file.originalname,
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      }));

      const saleInstance = new this.salesModule({
        files: filesData,
        iduser: createSaleDto.iduser,
        ofert: createSaleDto.ofert,
        email: createSaleDto.email,
        phone: createSaleDto.phone,
        parking: createSaleDto.parking,
        neighborhood: createSaleDto.neighborhood,
        country: createSaleDto.country,
        city: createSaleDto.city,
        property: createSaleDto.property,
        stratum: createSaleDto.stratum,
        price: createSaleDto.price,
        room: createSaleDto.room,
        restroom: createSaleDto.restroom,
        age: createSaleDto.age,
        administration: createSaleDto.administration,
        area: createSaleDto.area,
        description: createSaleDto.description,
        created_at: createSaleDto.created_at,
        finished_at: createSaleDto.finished_at
      });

      const savedSale = await saleInstance.save();

      return {
        files: savedSale.files.map((file) => ({
          originalname: file.originalname,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          _id: file._id,
          __v: file.__v,
        })),
        ofert: savedSale.ofert,
        iduser: savedSale.iduser,
        email: savedSale.email,
        phone: savedSale.phone,
        parking: savedSale.parking,
        neighborhood: savedSale.neighborhood,
        country: savedSale.country,
        city: savedSale.city,
        property: savedSale.property,
        stratum: savedSale.stratum,
        price: savedSale.price,
        room: savedSale.room,
        restroom: savedSale.restroom,
        age: savedSale.age,
        administration: savedSale.administration,
        area: savedSale.area,
        description: savedSale.description,
        created_at: savedSale.created_at,
        finished_at: savedSale.finished_at
      };
    } catch (error) {
      console.error(error);
      throw new Error(
        'Error al guardar los archivos en la base de datos. Detalles: ' +
          error.message,
      );
    }
  }

  async findAllByAllMethods(
    stratum?: string,
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

    const list = await this.salesModule.find(query).exec();
    return list;
  }

  async findAllByUser(iduser?: string) {
    const query: any = {};

    if (iduser !== undefined) {
      query.iduser = iduser;  
    }

    const list = await this.salesModule.find(query).exec();
    return list;
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
