import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should return metadata object', () => {
    const expectedMetadata = {
      title: 'Pokémon trading card game organizer API',
      summary: 'API to organize your Pokémon trading card game collection.',
      version: '1.0.0',
      author: {
        name: 'Allan Foppa Fagundes',
        email: 'allanfoppa.dev@gmail.com',
        githubProfile: 'https://github.com/allanfoppa',
      },
    };

    const metadata = service.metadata();

    expect(metadata).toEqual(expectedMetadata);
  });

});
