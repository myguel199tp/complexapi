import { PartialType } from '@nestjs/swagger';
import { CreateRegisterComplexDto } from './create-register-complex.dto';

export class UpdateRegisterComplexDto extends PartialType(CreateRegisterComplexDto) {}
