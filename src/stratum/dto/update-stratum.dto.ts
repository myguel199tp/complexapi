import { PartialType } from '@nestjs/swagger';
import { CreateStratumDto } from './create-stratum.dto';

export class UpdateStratumDto extends PartialType(CreateStratumDto) {}
