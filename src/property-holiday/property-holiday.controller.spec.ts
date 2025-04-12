import { Test, TestingModule } from '@nestjs/testing';
import { PropertyHolidayController } from './property-holiday.controller';
import { PropertyHolidayService } from './property-holiday.service';

describe('PropertyHolidayController', () => {
  let controller: PropertyHolidayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyHolidayController],
      providers: [PropertyHolidayService],
    }).compile();

    controller = module.get<PropertyHolidayController>(PropertyHolidayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
