import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

describe('RoomController', () => {
  let controller: RoomController;
  let service: RoomService;

  const mockRoomService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: RoomService,
          useValue: mockRoomService,
        },
      ],
    }).compile();

    controller = module.get<RoomController>(RoomController);
    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call RoomService.create and return the result', async () => {
      const dto: CreateRoomDto = {
        id: '1',
        name: '1',
      };
      const expectedResult = { id: '1', ...dto };

      mockRoomService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);
      expect(result).toEqual(expectedResult);
      expect(mockRoomService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw an HttpException if RoomService.create fails', async () => {
      const dto: CreateRoomDto = {
        id: '2',
        name: '2',
      };

      mockRoomService.create.mockRejectedValue(new Error('Creation failed'));

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
  });

  describe('findAll', () => {
    it('should call RoomService.findAll and return the result', async () => {
      const expectedRooms = [
        { id: '1', name: '1' },
        { id: '2', name: '2' },
      ];

      mockRoomService.findAll.mockResolvedValue(expectedRooms);

      const result = await controller.findAll();
      expect(result).toEqual(expectedRooms);
      expect(mockRoomService.findAll).toHaveBeenCalled();
    });
  });
});
