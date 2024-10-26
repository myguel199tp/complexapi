/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mail.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('/send-email')
  async sendMail() {
    const dto: SendEmailDto = {
      from: { name: 'Complexes', address: 'complexes@example.com' },
      recipients: [{ name: 'jhon Doe', address: 'john@example.com' }],
      subject: 'Lucky winner',
      html: '<p>hi this is a new <strong>colombia</strong></p>',
    };
    return await this.mailerService.sendEmail(dto);
  }
}
