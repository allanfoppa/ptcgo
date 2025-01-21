import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

describe('EnvironmentModule', () => {
  let environmentModule: PrismaModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        PrismaModule,
      ],
      providers: [PrismaService],
    }).compile();

    environmentModule = module.get<PrismaModule>(PrismaModule);
  });

  it('should be defined', () => {
    expect(environmentModule).toBeDefined();
  });
});
