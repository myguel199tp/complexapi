import { Test, TestingModule } from '@nestjs/testing';
import { RestroomService } from './restroom.service';

describe('RestroomService', () => {
  let service: RestroomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestroomService],
    }).compile();

    service = module.get<RestroomService>(RestroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
