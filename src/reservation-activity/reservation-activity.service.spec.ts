import { Test, TestingModule } from '@nestjs/testing';
import { ReservationActivityService } from './reservation-activity.service';

describe('ReservationActivityService', () => {
  let service: ReservationActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationActivityService],
    }).compile();

    service = module.get<ReservationActivityService>(ReservationActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
