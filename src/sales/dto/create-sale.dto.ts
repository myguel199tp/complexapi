/* eslint-disable prettier/prettier */
// import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { CreateVenteDto } from './create-vente.dto';

export class CreateSaleDto extends CreateVenteDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsObject({ each: true })
  files: Express.Multer.File[];
}
