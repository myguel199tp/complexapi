import { Test, TestingModule } from '@nestjs/testing';
import { RegisterComplexController } from './register-complex.controller';
import { RegisterComplexService } from './register-complex.service';

describe('RegisterComplexController', () => {
  let controller: RegisterComplexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterComplexController],
      providers: [RegisterComplexService],
    }).compile();

    controller = module.get<RegisterComplexController>(RegisterComplexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
