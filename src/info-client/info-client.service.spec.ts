import { Test, TestingModule } from '@nestjs/testing';
import { InfoClientService } from './info-client.service';

describe('InfoClientService', () => {
  let service: InfoClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoClientService],
    }).compile();

    service = module.get<InfoClientService>(InfoClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
