import { Test, TestingModule } from '@nestjs/testing';
import { OfertService } from './ofert.service';

describe('OfertService', () => {
  let service: OfertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfertService],
    }).compile();

    service = module.get<OfertService>(OfertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
