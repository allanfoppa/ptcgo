import { Test, TestingModule } from '@nestjs/testing';
import { MetadataHelper } from './metadata.helper';

describe('MetadataHelper', () => {
  let metadataHelper: MetadataHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadataHelper],
    }).compile();

    metadataHelper = module.get<MetadataHelper>(MetadataHelper);
  });

  it('should be defined', () => {
    expect(metadataHelper).toBeDefined();
  });

  it('should return correct metadata', () => {
    const metadata = metadataHelper.get();
    expect(metadata).toEqual({
      title: "Pokémon trading card game organizer API",
      summary: "API to organize your Pokémon trading card game collection.",
      version: process.env.APP_VERSION,
      author: {
        name: "Allan Foppa Fagundes",
        email: "allanfoppa.dev@gmail.com",
        githubProfile: "https://github.com/allanfoppa",
      },
    });
  });

  it('should return correct version from environment variable', () => {
    process.env.APP_VERSION = '1.0.0';
    const metadata = metadataHelper.get();
    expect(metadata.version).toBe('1.0.0');
  });
});
