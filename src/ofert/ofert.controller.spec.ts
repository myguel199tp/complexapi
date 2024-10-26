import { Test, TestingModule } from '@nestjs/testing';
import { OfertController } from './ofert.controller';
import { OfertService } from './ofert.service';

describe('OfertController', () => {
  let controller: OfertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfertController],
      providers: [OfertService],
    }).compile();

    controller = module.get<OfertController>(OfertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
