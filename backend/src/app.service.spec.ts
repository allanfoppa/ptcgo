import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct metadata', () => {
    process.env.APP_VERSION = '1.0.0';
    const metadata = service.metadata();
    expect(metadata).toEqual({
      title: 'Pokémon trading card game organizer API',
      summary: 'API to organize your Pokémon trading card game collection.',
      version: '1.0.0',
      author: {
        name: 'Allan Foppa Fagundes',
        email: 'allanfoppa.dev@gmail.com',
        githubProfile: 'https://github.com/allanfoppa',
      },
    });
  });

  it('should return undefined version if APP_VERSION is not set', () => {
    delete process.env.APP_VERSION;
    const metadata = service.metadata();
    expect(metadata.version).toBeUndefined();
  });
});
