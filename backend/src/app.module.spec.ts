import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ResponseHelper } from './common/helpers/response/response.helper';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env'
        }),
        AppModule
      ],
      controllers: [AppController],
      providers: [AppService, ResponseHelper],
    }).compile();

    appModule = module.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should configure middleware', () => {
    const consumer = {
      apply: jest.fn().mockReturnThis(),
      forRoutes: jest.fn().mockReturnThis(),
    };

    appModule.configure(consumer as any);

    expect(consumer.apply).toHaveBeenCalled();
    expect(consumer.forRoutes).toHaveBeenCalled();
  });

});
