import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { cwd } from 'process';
import { MailingService } from './mailing.service';
import * as Handlebars from 'handlebars';
import { I18nService } from 'nestjs-i18n';

// Enregistrer le helper 'even'
Handlebars.registerHelper('even', function (index: number) {
  return index % 2 === 0;
});

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, I18nService],
      useFactory: (configService: ConfigService, i18n: I18nService) => {
        return {
          transport: {
            host: configService.get('MAIL_HOST'),
            port: configService.get('MAIL_PORT'),
            secure: true,
            auth: {
              user: configService.get('MAIL_USER'),
              pass: configService.get('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: configService.get('MAIL_FROM'),
          },
          template: {
            dir: join(cwd(), 'templates'),
            adapter: new HandlebarsAdapter({ t: i18n.hbsHelper }),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
