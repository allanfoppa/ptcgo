import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';


describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;


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
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should return metadata from AppService', () => {
    // Arrange: Set up the mock return value for metadata method
    const expectedMetadata = {
      message: 'Success retrieving metadata.',
      data: {
        title: 'Pokémon trading card game organizer API',
        summary: 'API to organize your Pokémon trading card game collection.',
        version: '1.0.0',
        author: {
          name: 'Allan Foppa Fagundes',
          email: 'allanfoppa.dev@gmail.com',
          githubProfile: 'https://github.com/allanfoppa',
        },
      }
    };

    (appService.metadata as jest.Mock).mockReturnValue(expectedMetadata);

    // Act: Call the metadata method of the controller
    const result = appController.metadata();

    // Assert: Ensure AppService's metadata method is called and the result is correct
    expect(appService.metadata).toHaveBeenCalled();
    expect(result).toEqual(expectedMetadata);
  });

  it('should throw an error when AppService fails', () => {
    // Arrange: Set up the mock return value for metadata method
    (appService.metadata as jest.Mock).mockImplementation(() => {
      throw new Error('Internal server error');
    });

    // Act: Call the metadata method of the controller
    const result = () => appController.metadata();

    // Assert: Ensure an error is thrown
    expect(result).toThrow()
  })
});
