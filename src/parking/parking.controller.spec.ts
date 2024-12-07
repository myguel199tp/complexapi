import { Test, TestingModule } from '@nestjs/testing';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ParkingController', () => {
  let controller: ParkingController;
  let service: ParkingService;

  const mockParkingService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [
        {
          provide: ParkingService,
          useValue: mockParkingService,
        },
      ],
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
    service = module.get<ParkingService>(ParkingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call ParkingService.create and return the result', async () => {
      const dto: CreateParkingDto = {
        id: '1',
        name: '1',
      };
      const expectedResult = { id: '1', ...dto };

      mockParkingService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);
      expect(result).toEqual(expectedResult);
      expect(mockParkingService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw an HttpException if ParkingService.create fails', async () => {
      const dto: CreateParkingDto = {
        id: '2',
        name: '2',
      };

      mockParkingService.create.mockRejectedValue(new Error('Creation failed'));

      await expect(controller.create(dto)).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'No se pudo crear el registro de habitacion',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    describe('findAll', () => {
      it('should call ParkingService.findAll and return the result', async () => {
        const expectedRooms = [
          { id: '1', name: '1' },
          { id: '2', name: '2' },
        ];

        mockParkingService.findAll.mockResolvedValue(expectedRooms);

        const result = await controller.findAll();
        expect(result).toEqual(expectedRooms);
        expect(mockParkingService.findAll).toHaveBeenCalled();
      });
    });
  });
});
