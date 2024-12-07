import { Test, TestingModule } from '@nestjs/testing';
import { RestroomController } from './restroom.controller';
import { RestroomService } from './restroom.service';
import { CreateRestroomDto } from './dto/create-restroom.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RestroomController', () => {
  let controller: RestroomController;
  let service: RestroomService;

  const mockRestroomService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestroomController],
      providers: [
        {
          provide: RestroomService,
          useValue: mockRestroomService,
        },
      ],
    }).compile();

    controller = module.get<RestroomController>(RestroomController);
    service = module.get<RestroomService>(RestroomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call RestroomService.create and return the result', async () => {
      const dto: CreateRestroomDto = {
        id: '1',
        name: '1',
      };
      const expectedResult = { id: '1', ...dto };

      mockRestroomService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);
      expect(result).toEqual(expectedResult);
      expect(mockRestroomService.create).toHaveBeenCalledWith(dto);
    });
    it('should throw an HttpException if RestroomService.create fails', async () => {
      const dto: CreateRestroomDto = {
        id: '2',
        name: '2',
      };

      mockRestroomService.create.mockRejectedValue(
        new Error('Creation failed'),
      );

      await expect(controller.create(dto)).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'No se pudo crear el registro de baño',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    describe('findAll', () => {
      it('should call RstroomService.findAll and return the result', async () => {
        const expectedRooms = [
          { id: '1', name: '1' },
          { id: '2', name: '2' },
        ];

        mockRestroomService.findAll.mockResolvedValue(expectedRooms);

        const result = await controller.findAll();
        expect(result).toEqual(expectedRooms);
        expect(mockRestroomService.findAll).toHaveBeenCalled();
      });
    });
  });
});
