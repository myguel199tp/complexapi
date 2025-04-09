/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import { CreateVenteDto } from './create-vente.dto';

export class UpdateSaleDto extends PartialType(CreateVenteDto) {}
