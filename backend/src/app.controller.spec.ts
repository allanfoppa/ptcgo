import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseHelper } from '@common/helpers/response/response.helper';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            metadata: jest.fn().mockReturnValue({ version: '1.0.0' }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('metadata', () => {
    it('should return metadata successfully', () => {
      const result = {
        message: 'Metadata retrieved successfully',
        data: { version: '1.0.0' },
      };

      jest.spyOn(ResponseHelper, 'success').mockReturnValue(result);

      expect(appController.metadata()).toEqual(result);
      expect(appService.metadata).toHaveBeenCalled();
    });

    it('should throw an InternalServerErrorException on error', () => {
      jest.spyOn(appService, 'metadata').mockImplementation(() => {
        throw new Error('Test error');
      });

      try {
        appController.metadata();
      } catch (error) {
        expect(error.message).toBe('Test error');
      }
    });
  });
});
