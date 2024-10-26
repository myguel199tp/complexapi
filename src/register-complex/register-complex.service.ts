/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRegisterComplexDto } from './dto/create-register-complex.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterComplex, RegisterComplexDocument } from './shema/register-complex-shema';

@Injectable()
export class RegisterComplexService {
  constructor(
    @InjectModel(RegisterComplex.name) private registerComplexModule: Model<RegisterComplexDocument>,
  ) {}

  async create(registerComplexModule: CreateRegisterComplexDto) {
    const registerComplexCrate = await this.registerComplexModule.create(registerComplexModule);
    return registerComplexCrate;
  }

  async findAll() {
    const RegisterComplex = await this.registerComplexModule.find({});
    return RegisterComplex;
  }
}
