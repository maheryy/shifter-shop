import { Test, TestingModule } from '@nestjs/testing';
import { StripeService } from 'src/stripe/stripe.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from 'src/mocks/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HelperModule } from 'src/helper/helper.module';

describe('StripeService', () => {
  let service: StripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(configModuleOptions),
        PrismaModule,
        HelperModule,
      ],
      providers: [StripeService],
    }).compile();

    service = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
