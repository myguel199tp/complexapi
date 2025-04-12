import { Test, TestingModule } from '@nestjs/testing';
import { PropertyHolidayService } from './property-holiday.service';

describe('PropertyHolidayService', () => {
  let service: PropertyHolidayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyHolidayService],
    }).compile();

    service = module.get<PropertyHolidayService>(PropertyHolidayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
