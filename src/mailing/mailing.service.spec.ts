import { Test, TestingModule } from '@nestjs/testing';
import { MailingService } from './mailing.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailingService', () => {
  let service: MailingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailingService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MailingService>(MailingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('sendMail should send an email with the correct parameters', async () => {
    const to = 'test@example.com';
    const subject = 'Test Subject';
    const template = 'test-template';
    const context = { key: 'value' };
    const sentMessageInfo = { messageId: '123' };
    jest
      .spyOn(service['mailerService'], 'sendMail')
      .mockResolvedValue(sentMessageInfo as any);

    const result = await service.sendMail(to, subject, template, context);

    expect(result).toEqual(sentMessageInfo);
    expect(service['mailerService'].sendMail).toHaveBeenCalledWith({
      to,
      subject,
      template,
      context,
    });
  });

  it('sendMail should throw an error if mailerService fails', async () => {
    const to = 'test@example.com';
    const subject = 'Test Subject';
    const template = 'test-template';
    const context = { key: 'value' };
    jest
      .spyOn(service['mailerService'], 'sendMail')
      .mockRejectedValue(new Error('Mailer error'));

    await expect(
      service.sendMail(to, subject, template, context),
    ).rejects.toThrow('Mailer error');
  });
});
