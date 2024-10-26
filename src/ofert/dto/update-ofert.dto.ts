import { PartialType } from '@nestjs/swagger';
import { CreateOfertDto } from './create-ofert.dto';

export class UpdateOfertDto extends PartialType(CreateOfertDto) {}
