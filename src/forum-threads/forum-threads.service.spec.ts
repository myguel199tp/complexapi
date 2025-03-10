import { Test, TestingModule } from '@nestjs/testing';
import { ForumThreadsService } from './forum-threads.service';

describe('ForumThreadsService', () => {
  let service: ForumThreadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumThreadsService],
    }).compile();

    service = module.get<ForumThreadsService>(ForumThreadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
