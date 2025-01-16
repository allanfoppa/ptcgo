import { Injectable } from '@nestjs/common';

type TMetadata = {
  title: string;
  summary: string;
  version: string;
  author: {
    name: string;
    email: string;
    githubProfile: string;
  }
}

@Injectable()
export class MetadataHelper {
  get(): TMetadata{
    return {
      "title": "Pokémon trading card game organizer API",
      "summary": "API to organize your Pokémon trading card game collection.",
      "version": process.env.APP_VERSION,
      "author": {
        "name": "Allan Foppa Fagundes",
        "email": "allanfoppa.dev@gmail.com",
        "githubProfile": "https://github.com/allanfoppa",
      },
    }
  }
}
