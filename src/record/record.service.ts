import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Record, RecordDocument } from './shema/record.shema';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private pdfModel: Model<RecordDocument>,
  ) {}
  async create(createPdfDto: CreateRecordDto): Promise<Record> {
    const createdPdf = new this.pdfModel(createPdfDto);
    return createdPdf.save();
  }

  async findAll(): Promise<Record[]> {
    return this.pdfModel.find().exec();
  }
}
