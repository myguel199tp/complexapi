/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RegisterComplexService } from './register-complex.service';
import { RegisterComplexController } from './register-complex.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterComplex, RegisterComplexSchema } from './shema/register-complex-shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RegisterComplex.name,
        schema: RegisterComplexSchema,
      },
    ]),
  ],
  controllers: [RegisterComplexController],
  providers: [RegisterComplexService]
})
export class RegisterComplexModule {}
