import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewAdminDto } from './dto/create-new-admin.dto';
import { UpdateNewAdminDto } from './dto/update-new-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InfoNewAdmin } from './shema/info-new-admin.shema';
import { Model } from 'mongoose';
import { LeasesDocument } from 'src/leases/shema/leases.shema';

@Injectable()
export class NewAdminService {
  constructor(
    @InjectModel(InfoNewAdmin.name)
    private infoNewModule: Model<LeasesDocument>,
  ) {}

  async registerNew(createNewAdminDto: CreateNewAdminDto): Promise<any> {
    try {
      const newUser = new this.infoNewModule({
        ...createNewAdminDto,
      });

      return await newUser.save();
    } catch (error) {
      throw new HttpException(
        `Error al registrar el administrador: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  create(createNewAdminDto: CreateNewAdminDto) {
    return 'This action adds a new newAdmin';
  }

  findAll() {
    return `This action returns all newAdmin`;
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
