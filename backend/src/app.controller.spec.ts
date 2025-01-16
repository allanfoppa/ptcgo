import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadataHelper } from './common/helpers/metadata/metadata.helper';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let metadataHelper: MetadataHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            metadata: jest.fn(),
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

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
    metadataHelper = module.get<MetadataHelper>(MetadataHelper);
  });

  it('should return metadata from AppService', () => {
    // Arrange: Set up the mock return value for metadata method
    const expectedMetadata = {
      message: 'Success retrieving metadata.',
      data: metadataHelper.get()
    };

    (appService.metadata as jest.Mock).mockReturnValue(expectedMetadata);

    // Act: Call the metadata method of the controller
    const result = appController.metadata();

    // Assert: Ensure AppService's metadata method is called and the result is correct
    expect(appService.metadata).toHaveBeenCalled();
    expect(result).toEqual(expectedMetadata);
  });
});
