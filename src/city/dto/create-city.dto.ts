import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class CityDetail {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export class CreateCityDto {
  @IsString()
  indicative: string;

  @IsString()
  currency: string;

  @IsString()
  country: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CityDetail)
  city: CityDetail[];
}
