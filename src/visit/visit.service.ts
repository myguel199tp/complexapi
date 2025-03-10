import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit } from './entities/visit.entity';
import { VisitDocument } from './shema/visit.shema';

@Injectable()
export class VisitService {
  constructor(
    @InjectModel(Visit.name)
    private infoNewModule: Model<VisitDocument>,
  ) {}

  async registerNew(createVisitDto: CreateVisitDto): Promise<any> {
    try {
      const visitUser = new this.infoNewModule({
        ...createVisitDto,
      });

      return await visitUser.save();
    } catch (error) {
      throw new HttpException(
        `Error al registrar el visitante: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  create(createVisitDto: CreateVisitDto) {
    return 'This action adds a new visit';
  }

  findAll() {
    return `This action returns all visit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visit`;
  }

  update(id: number, updateVisitDto: UpdateVisitDto) {
    return `This action updates a #${id} visit`;
  }

  remove(id: number) {
    return `This action removes a #${id} visit`;
  }
}
