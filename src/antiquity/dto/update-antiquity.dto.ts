import { PartialType } from '@nestjs/swagger';
import { CreateAntiquityDto } from './create-antiquity.dto';

export class UpdateAntiquityDto extends PartialType(CreateAntiquityDto) {}
