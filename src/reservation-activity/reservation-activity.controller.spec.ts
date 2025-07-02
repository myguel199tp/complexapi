import { Test, TestingModule } from '@nestjs/testing';
import { ReservationActivityController } from './reservation-activity.controller';
import { ReservationActivityService } from './reservation-activity.service';

describe('ReservationActivityController', () => {
  let controller: ReservationActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationActivityController],
      providers: [ReservationActivityService],
    }).compile();

    controller = module.get<ReservationActivityController>(ReservationActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
