import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '../mocks/config';
import { StripeService } from './stripe.service';

describe('StripeController', () => {
  let controller: StripeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(configModuleOptions)],
      providers: [StripeService],
      controllers: [StripeController],
    }).compile();

    controller = module.get<StripeController>(StripeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
