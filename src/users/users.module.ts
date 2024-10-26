/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './shema/users.shema';
import { Sales, SalesSchema } from 'src/sales/shema/sales.shema';
import { FileSchema } from 'src/file/shema/file.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Sales.name,
        schema: SalesSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
