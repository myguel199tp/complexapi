import { Test, TestingModule } from '@nestjs/testing';
import { NewAdminService } from './new-admin.service';

describe('NewAdminService', () => {
  let service: NewAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewAdminService],
    }).compile();

    service = module.get<NewAdminService>(NewAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
