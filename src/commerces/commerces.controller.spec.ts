import { Test, TestingModule } from '@nestjs/testing';
import { CommercesController } from './commerces.controller';
import { CommercesService } from './commerces.service';

describe('CommercesController', () => {
  let controller: CommercesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercesController],
      providers: [CommercesService],
    }).compile();

    controller = module.get<CommercesController>(CommercesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
