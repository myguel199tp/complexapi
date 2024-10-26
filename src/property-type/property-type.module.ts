import { Module } from '@nestjs/common';
import { PropertyTypeService } from './property-type.service';
import { PropertyTypeController } from './property-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyType, PropertyTypeSchema } from './shema/property-type.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PropertyType.name,
        schema: PropertyTypeSchema,
      },
    ]),
  ],
  controllers: [PropertyTypeController],
  providers: [PropertyTypeService],
})
export class PropertyTypeModule {}
