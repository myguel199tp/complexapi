import { Test, TestingModule } from '@nestjs/testing';
import { InfoClientController } from './info-client.controller';
import { InfoClientService } from './info-client.service';

describe('InfoClientController', () => {
  let controller: InfoClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoClientController],
      providers: [InfoClientService],
    }).compile();

    controller = module.get<InfoClientController>(InfoClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
