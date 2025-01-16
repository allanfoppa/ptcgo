import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service'; // Update path if needed
import { ResponseHelper } from './common/helpers/response/response.helper'; // Update path if needed
import { InternalServerErrorException } from '@nestjs/common';
import { MetadataHelper } from './common/helpers/metadata/metadata.helper';

describe('AppService', () => {
  let appService: AppService;
  let responseHelper: ResponseHelper;
  let metadataHelper: MetadataHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ResponseHelper,
          useValue: {
            createResponse: jest.fn(),
          },
        },
        {
          provide: MetadataHelper,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    responseHelper = module.get<ResponseHelper>(ResponseHelper);
    metadataHelper = module.get<MetadataHelper>(MetadataHelper);
  });

  describe('metadata', () => {
    it('should return metadata successfully', () => {
      // Arrange: Mock the responseHelper's createResponse method
      const expectedResponse = {
        message: 'Success retrieving metadata.',
        data: metadataHelper.get(),
      };

      (responseHelper.createResponse as jest.Mock).mockReturnValue(expectedResponse);

      // Act: Call the metadata method
      const result = appService.metadata();

      // Assert: Ensure the createResponse method was called with correct args
      expect(responseHelper.createResponse).toHaveBeenCalledWith({
        message: 'Success retrieving metadata.',
        content: metadataHelper.get(),
      });
      expect(result).toEqual(expectedResponse);
    });

    it('should throw InternalServerErrorException if an error occurs', () => {
      // Arrange: Simulate an error
      (responseHelper.createResponse as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      // Act & Assert: Expect the method to throw the InternalServerErrorException
      expect(() => appService.metadata()).toThrow(InternalServerErrorException);
    });
  });
});
