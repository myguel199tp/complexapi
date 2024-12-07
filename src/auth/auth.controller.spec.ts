import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthtService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const mockFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'urb.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 1024,
    buffer: Buffer.from('mock content'),
    stream: null as any,
    destination: '',
    filename: '',
    path: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthtService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call AuthService.create and return the result', async () => {
      const dto: CreateAuthDto = {
        name: 'vanesa',
        lastName: 'uribe',
        city: 'bogota',
        phone: '3343432344',
        email: 'vanesa@gmail.com',
        password: '134324a',
        termsConditions: 'true',
        nameUnit: 'san lorenzo',
        file: mockFile,
      };
      const expectedResult = { id: '1', ...dto };

      mockAuthtService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);
      expect(result).toEqual(expectedResult);
      expect(mockAuthtService.create).toHaveBeenCalledWith(dto);
    });
    it('should throw an HttpException if AuthService.create fails', async () => {
      const dto: CreateAuthDto = {
        name: 'vanesa',
        lastName: 'uribe',
        city: 'bogota',
        phone: '3343432344',
        email: 'vanesa@gmail.com',
        password: '134324a',
        termsConditions: 'true',
        nameUnit: 'san lorenzo',
        file: mockFile,
      };

      mockAuthtService.create.mockRejectedValue(new Error('Creation failed'));

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
      it('should call AuthService.findAll and return the result', async () => {
        const expectedAuth = [
          {
            name: 'vanesa',
            lastName: 'uribe',
            city: 'bogota',
            phone: '3343432344',
            email: 'vanesa@gmail.com',
            password: '134324a',
            termsConditions: true,
          },
          {
            name: 'laura',
            lastName: 'uribe',
            city: 'bogota',
            phone: '3343432334',
            email: 'laura@gmail.com',
            password: '1343264a',
            termsConditions: true,
          },
        ];

        mockAuthtService.findAll.mockResolvedValue(expectedAuth);

        const result = await controller.findAll();
        expect(result).toEqual(expectedAuth);
        expect(mockAuthtService.findAll).toHaveBeenCalled();
      });
    });
  });
});
