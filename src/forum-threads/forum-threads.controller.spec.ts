import { Test, TestingModule } from '@nestjs/testing';
import { ForumThreadsController } from './forum-threads.controller';
import { ForumThreadsService } from './forum-threads.service';

describe('ForumThreadsController', () => {
  let controller: ForumThreadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumThreadsController],
      providers: [ForumThreadsService],
    }).compile();

    controller = module.get<ForumThreadsController>(ForumThreadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
