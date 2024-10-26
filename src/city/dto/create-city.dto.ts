/* eslint-disable prettier/prettier */
export class CreateCityDto {
  indicative: string;
  currency: string;
  country: string;
  city: { id: number; name: string }[];
}