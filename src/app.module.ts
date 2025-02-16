import { config } from 'dotenv';
config();

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeasesModule } from './leases/leases.module';
import { RentModule } from './rent/rent.module';
import { OfertModule } from './ofert/ofert.module';
import { StratumModule } from './stratum/stratum.module';
import { PropertyTypeModule } from './property-type/property-type.module';
import { AntiquityModule } from './antiquity/antiquity.module';
import { RoomModule } from './room/room.module';
import { RestroomModule } from './restroom/restroom.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { SpecialityModule } from './speciality/speciality.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { MailerModule } from './mailer/mailer.module';
import { InfoClientModule } from './info-client/info-client.module';
import { ParkingModule } from './parking/parking.module';
import { InterestedModule } from './interested/interested.module';
import { ContactModule } from './contact/contact.module';
import { CityModule } from './city/city.module';
import { FileModule } from './file/file.module';
import { join } from 'path';
import { CommercesModule } from './commerces/commerces.module';
import { NewAdminModule } from './new-admin/new-admin.module';
import { ActivitiesModule } from './activities/activities.module';
import { ForumThreadsModule } from './forum-threads/forum-threads.module';
import { HollidayModule } from './holliday/holliday.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MulterModule.register({
      dest: join(__dirname, '..', 'uploads'),
    }),
    LeasesModule,
    RentModule,
    OfertModule,
    StratumModule,
    PropertyTypeModule,
    AntiquityModule,
    RoomModule,
    RestroomModule,
    AdvertisementsModule,
    ServiceTypeModule,
    SpecialityModule,
    AuthModule,
    UsersModule,
    SalesModule,
    MailerModule,
    InfoClientModule,
    ParkingModule,
    InterestedModule,
    ContactModule,
    CityModule,
    FileModule,
    CommercesModule,
    ChatModule,
    NewAdminModule,
    ActivitiesModule,
    ForumThreadsModule,
    HollidayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}

  static setupSwagger(app: any) {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('Documentación de API para la aplicación')
      .setVersion('1.0')
      .addTag('file')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
