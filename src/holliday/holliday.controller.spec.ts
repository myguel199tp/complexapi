import { Test, TestingModule } from '@nestjs/testing';
import { HollidayController } from './holliday.controller';
import { HollidayService } from './holliday.service';

describe('HollidayController', () => {
  let controller: HollidayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HollidayController],
      providers: [HollidayService],
    }).compile();

    controller = module.get<HollidayController>(HollidayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
