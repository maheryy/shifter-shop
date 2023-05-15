import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
