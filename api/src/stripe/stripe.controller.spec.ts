import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from 'src/stripe/stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from 'src/mocks/config';
import { StripeService } from 'src/stripe/stripe.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HelperModule } from 'src/helper/helper.module';
import { MailerModule } from 'src/mailer/mailer.module';

describe.skip('StripeController', () => {
  let controller: StripeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(configModuleOptions),
        PrismaModule,
        HelperModule,
        MailerModule,
      ],
      providers: [StripeService],
      controllers: [StripeController],
    }).compile();

    controller = module.get<StripeController>(StripeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
