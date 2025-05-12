/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateCommerceDto } from './create-commerce.dto';
// import { Type } from 'class-transformer';

export class UpdateFileDto extends PartialType(CreateCommerceDto) {}
