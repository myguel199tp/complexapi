import { Test, TestingModule } from '@nestjs/testing';
import { HollidayService } from './holliday.service';

describe('HollidayService', () => {
  let service: HollidayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HollidayService],
    }).compile();

    service = module.get<HollidayService>(HollidayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
