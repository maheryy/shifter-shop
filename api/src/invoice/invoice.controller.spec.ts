import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helper/helper.module';
import { InvoiceService } from './invoice.service';

describe('InvoiceController', () => {
  let controller: InvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, HelperModule],
      providers: [InvoiceService],
      controllers: [InvoiceController],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
