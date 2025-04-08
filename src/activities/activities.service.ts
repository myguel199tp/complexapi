import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './shema/activity.shema';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name)
    private activityModule: Model<ActivityDocument>,
  ) {}
  async registerNew(createActivityDto: CreateActivityDto): Promise<any> {
    try {
      const visitUser = new this.activityModule({
        ...createActivityDto,
      });

      return await visitUser.save();
    } catch (error) {
      throw new HttpException(
        `Error al registrar el actividad: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  create(createActivityDto: CreateActivityDto) {
    return 'This action adds a new activity';
  }

  async findAll(nameUnit?: string) {
    const filter = nameUnit
      ? { nameUnit: { $regex: new RegExp(nameUnit, 'i') } }
      : {};
    const list = await this.activityModule.find(filter);
    return list;
  }
  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
