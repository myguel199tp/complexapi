import { PartialType } from '@nestjs/swagger';
import { CreateCommerceDto } from './create-commerce.dto';

export class UpdateCommerceDto extends PartialType(CreateCommerceDto) {}
