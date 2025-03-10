import { Test, TestingModule } from '@nestjs/testing';
import { AntiquityController } from './antiquity.controller';
import { AntiquityService } from './antiquity.service';
import { CreateAntiquityDto } from './dto/create-antiquity.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AntiquityController', () => {
  let controller: AntiquityController;
  let service: AntiquityService;

  const mockAntiquityService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AntiquityController],
      providers: [
        {
          provide: AntiquityService,
          useValue: mockAntiquityService,
        },
      ],
    }).compile();

    controller = module.get<AntiquityController>(AntiquityController);
    service = module.get<AntiquityService>(AntiquityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call AntiquityService.create and return the result', async () => {
      const dto: CreateAntiquityDto = {
        id: '1',
        name: '1',
      };
      const expectedResult = { id: '1', ...dto };

      mockAntiquityService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);
      expect(result).toEqual(expectedResult);
      expect(mockAntiquityService.create).toHaveBeenCalledWith(dto);
    });
    it('should throw an HttpException if AntiquityService.create fails', async () => {
      const dto: CreateAntiquityDto = {
        id: '2',
        name: '2',
      };

      mockAntiquityService.create.mockRejectedValue(
        new Error('Creation failed'),
      );

      await expect(controller.create(dto)).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'No se pudo crear el registro de antiguedad',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    describe('findAll', () => {
      it('should call AntiquityService.findAll and return the result', async () => {
        const expectedAntiquity = [
          { id: '1', name: '1' },
          { id: '2', name: '2' },
        ];

        mockAntiquityService.findAll.mockResolvedValue(expectedAntiquity);

        const result = await controller.findAll();
        expect(result).toEqual(expectedAntiquity);
        expect(mockAntiquityService.findAll).toHaveBeenCalled();
      });
    });
  });
});
