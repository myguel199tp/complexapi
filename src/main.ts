/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Api documentation')
    .setDescription('The API description jyj conjuntos')
    .setVersion('1.0')
    .addTag('advertisements')
    .addTag('antiquity')
    .addTag('auth')
    .addTag('city')
    .addTag('commerces')
    .addTag('contact')
    .addTag('sales')
    .addTag('file')
    .addTag('info-client')
    .addTag('interested')
    .addTag('leases')
    .addTag('mailer')
    .addTag('ofert')
    .addTag('parking')
    .addTag('property-type')
    .addTag('register-complex')
    .addTag('rent')
    .addTag('restroom')
    .addTag('room')
    .addTag('sales')
    .addTag('service-type')
    .addTag('speciallity')
    .addTag('stratum')
    .addTag('users')
    .addTag('chat')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
bootstrap();
