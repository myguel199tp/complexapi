import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform {
  transform(value: string | boolean) {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    throw new BadRequestException('El valor debe ser un booleano.');
  }
}
