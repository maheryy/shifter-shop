import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { HelperModule } from '../helper/helper.module';
import { PrismaModule } from '../prisma/prisma.module';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, HelperModule],
      providers: [InvoiceService],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
