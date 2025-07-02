import { IsOptional, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  iduser: string;
  @IsString()
  nameUnit: string;
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  file?: string; // Ruta del PDF
  @IsString()
  created_at: string;
}
