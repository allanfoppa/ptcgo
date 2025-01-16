import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EnvironmentService } from './enviroments-variables.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EnvironmentService>(EnvironmentService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if required environment variables are missing', async () => {
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      if (key === 'APP_VERSION') return '1.0.0';
      if (key === 'NODE_ENV') return 'development';
      return null;
    });

    await expect(service.onApplicationBootstrap()).rejects.toThrow(
      'MISSING REQUIRED ENVIRONMENT VARIABLE: PORT',
    );
  });

  it('should not throw an error if all required environment variables are present', async () => {
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      if (key === 'APP_VERSION') return '1.0.0';
      if (key === 'NODE_ENV') return 'development';
      if (key === 'PORT') return '3000';
      return null;
    });

    await expect(service.onApplicationBootstrap()).resolves.not.toThrow();
  });
});
