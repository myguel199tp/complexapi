import { Test, TestingModule } from '@nestjs/testing';
import { StratumController } from './stratum.controller';
import { StratumService } from './stratum.service';

describe('StratumController', () => {
  let controller: StratumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StratumController],
      providers: [StratumService],
    }).compile();

    controller = module.get<StratumController>(StratumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
