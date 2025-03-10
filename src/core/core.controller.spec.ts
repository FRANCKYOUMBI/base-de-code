import { Test, TestingModule } from '@nestjs/testing';
import { CoreController } from './core.controller';
import { MailingService } from '@/mailing/mailing.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('CoreControllerTsController', () => {
  let controller: CoreController;

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
      controllers: [CoreController],
    }).compile();

    controller = module.get<CoreController>(CoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
