import { Test, TestingModule } from '@nestjs/testing';
import { AntiquityService } from './antiquity.service';

describe('AntiquityService', () => {
  let service: AntiquityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntiquityService],
    }).compile();

    service = module.get<AntiquityService>(AntiquityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
