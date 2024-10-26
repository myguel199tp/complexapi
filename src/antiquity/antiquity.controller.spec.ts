import { Test, TestingModule } from '@nestjs/testing';
import { AntiquityController } from './antiquity.controller';
import { AntiquityService } from './antiquity.service';

describe('AntiquityController', () => {
  let controller: AntiquityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AntiquityController],
      providers: [AntiquityService],
    }).compile();

    controller = module.get<AntiquityController>(AntiquityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
