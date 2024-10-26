/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './mail.interface';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  mailTrasnport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_password'),
      },
    });

    return transporter;
  }

  async sendEmail(dto: SendEmailDto) {
    const { from, recipients, subject, html } = dto;

    const transport = this.mailTrasnport();

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_EMAIL_FROM'),
      },
      to: recipients,
      subject,
      html,
    };

    try {
      const result = await transport.sendMail(options);

      return result;
    } catch (error) {
      console.log('Error mail:', error);
    }
  }
}
