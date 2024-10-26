import { PartialType } from '@nestjs/swagger';
import { CreateInterestedDto } from './create-interested.dto';

export class UpdateInterestedDto extends PartialType(CreateInterestedDto) {}
