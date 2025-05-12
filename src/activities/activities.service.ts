import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './shema/activity.shema';
import * as fs from 'fs';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name)
    private activityModule: Model<ActivityDocument>,
  ) {}
  async registerActivity(createActivityDto: CreateActivityDto): Promise<any> {
    try {
      const activityUser = new this.activityModule({
        ...createActivityDto,
      });

      return await activityUser.save();
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
    const query: any = {};

    if (nameUnit !== undefined) {
      query.nameUnit = nameUnit;
    }
    const list = await this.activityModule.find(query).exec();
    return list;
  }
  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activityModule.findById(id);

    if (!activity) {
      throw new NotFoundException(`No se encontró la actividad con id ${id}`);
    }

    // Si se subió un nuevo archivo, eliminar el anterior
    if (updateActivityDto.file && activity.file) {
      fs.unlink(activity.file, (err) => {
        if (err) {
          console.warn('No se pudo eliminar el archivo anterior:', err);
        }
      });
    }

    // Actualizar los campos
    Object.assign(activity, updateActivityDto);

    await activity.save();

    return activity;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
