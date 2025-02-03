import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  metadata(): object {
    const metadata = {
      title: 'Pokémon trading card game organizer API',
      summary: 'API to organize your Pokémon trading card game collection.',
      version: process.env.APP_VERSION,
      author: {
        name: 'Allan Foppa Fagundes',
        email: 'allanfoppa.dev@gmail.com',
        githubProfile: 'https://github.com/allanfoppa',
      },
    };

    try {
      return metadata;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
