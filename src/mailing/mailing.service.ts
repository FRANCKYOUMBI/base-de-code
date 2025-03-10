import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: object,
  ): Promise<SentMessageInfo> {
    return await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
