import { Test, TestingModule } from '@nestjs/testing';
import { RegisterComplexService } from './register-complex.service';

describe('RegisterComplexService', () => {
  let service: RegisterComplexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterComplexService],
    }).compile();

    service = module.get<RegisterComplexService>(RegisterComplexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
