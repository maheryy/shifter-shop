import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '../mocks/config';
import { StripeService } from './stripe.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helper/helper.module';
import { MailerModule } from '../mailer/mailer.module';

describe.skip('StripeController', () => {
  let controller: StripeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(configModuleOptions), PrismaModule, HelperModule, MailerModule],
      providers: [StripeService],
      controllers: [StripeController],
    }).compile();

    controller = module.get<StripeController>(StripeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
