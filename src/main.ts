/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Api documentation')
    .setDescription('The API description jyj conjuntos')
    .setVersion('1.0')
    .addTag('sales')
    .addTag('leases')
    .addTag('ofert')
    .addTag('property-type')
    .addTag('rent')
    .addTag('restroom')
    .addTag('room')
    .addTag('service-type')
    .addTag('speciallity')
    .addTag('stratum')
    .addTag('antiquity')
    .addTag('auth')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
