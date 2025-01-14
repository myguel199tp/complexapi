import { Test, TestingModule } from '@nestjs/testing';
import { NewAdminController } from './new-admin.controller';
import { NewAdminService } from './new-admin.service';

describe('NewAdminController', () => {
  let controller: NewAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewAdminController],
      providers: [NewAdminService],
    }).compile();

    controller = module.get<NewAdminController>(NewAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
