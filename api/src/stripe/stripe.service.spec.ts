import { Test, TestingModule } from '@nestjs/testing';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '../mocks/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helper/helper.module';

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
