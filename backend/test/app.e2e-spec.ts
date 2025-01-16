import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    process.env.NODE_ENV = 'uat';

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        "metadata": {
          "message":"Success retrieving metadata."
        },
        "content": {
          "title": "Pokémon trading card game organizer API",
          "summary": "API to organize your Pokémon trading card game collection.",
          "version": "1.0.0",
          "author":{
            "name": "Allan Foppa Fagundes",
            "email": "allanfoppa.dev@gmail.com",
            "githubProfile": "https://github.com/allanfoppa"
            }
          }
        }
      );
  });
});
