import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewAdminDto } from './dto/create-new-admin.dto';
import { UpdateNewAdminDto } from './dto/update-new-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  InfoNewAdmin,
  InfoNewAdminDocument,
} from './shema/info-new-admin.shema';
import { Model } from 'mongoose';

@Injectable()
export class NewAdminService {
  constructor(
    @InjectModel(InfoNewAdmin.name)
    private infoNewModule: Model<InfoNewAdminDocument>,
  ) {}

  async registerNew(createNewAdminDto: CreateNewAdminDto): Promise<any> {
    try {
      const newUser = new this.infoNewModule({
        ...createNewAdminDto,
      });

      return await newUser.save();
    } catch (error) {
      throw new HttpException(
        `Error al registrar la noticia: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  create(createNewAdminDto: CreateNewAdminDto) {
    return 'This action adds a new newAdmin';
  }

  async findAll(nameUnit?: string) {
    const query: any = {};

    if (nameUnit !== undefined) {
      query.nameUnit = nameUnit;
    }
    const list = await this.infoNewModule.find(query).exec();
    return list;
  }

  findOne(id: number) {
    return `This action returns a #${id} newAdmin`;
  }

  update(id: number, updateNewAdminDto: UpdateNewAdminDto) {
    return `This action updates a #${id} newAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} newAdmin`;
  }
}
