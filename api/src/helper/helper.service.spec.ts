import { Test, TestingModule } from '@nestjs/testing';
import { HelperService } from 'src//helper/helper.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [HelperService],
    }).compile();

    service = module.get<HelperService>(HelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
