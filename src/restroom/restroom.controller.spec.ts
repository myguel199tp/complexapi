import { Test, TestingModule } from '@nestjs/testing';
import { RestroomController } from './restroom.controller';
import { RestroomService } from './restroom.service';

describe('RestroomController', () => {
  let controller: RestroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestroomController],
      providers: [RestroomService],
    }).compile();

    controller = module.get<RestroomController>(RestroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
