/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/users/shema/users.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Sales, SalesSchema } from 'src/sales/shema/sales.shema';
import { SalesService } from 'src/sales/sales.service';
import { FileSchema } from 'src/file/shema/file.shema';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';

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
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SalesService, FileService],
})
export class AuthModule {}
