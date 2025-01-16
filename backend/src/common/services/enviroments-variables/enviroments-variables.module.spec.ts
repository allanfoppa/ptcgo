import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentModule } from './enviroments-variables.module';
import { EnvironmentService } from './enviroments-variables.service';
import { ConfigModule } from '@nestjs/config';

describe('EnvironmentModule', () => {
  let environmentModule: EnvironmentModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        EnvironmentModule,
      ],
      providers: [EnvironmentService],
    }).compile();

    environmentModule = module.get<EnvironmentModule>(EnvironmentModule);
  });

  it('should be defined', () => {
    expect(environmentModule).toBeDefined();
  });

});
