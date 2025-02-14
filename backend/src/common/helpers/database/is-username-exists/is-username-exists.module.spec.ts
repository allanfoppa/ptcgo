import { Test, TestingModule } from '@nestjs/testing';
import { IsUsernameExistsService } from './is-username-exists.service';
import { IsUsernameExistsRepository } from './is-username-exists.repository';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { IsUsernameExistsModule } from './is-username-exists.module';

describe('IsUsernameExistsModule', () => {
  let isUsernameExistsService: IsUsernameExistsService;
  let isUsernameExistsRepository: IsUsernameExistsRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IsUsernameExistsModule],
    }).compile();

    isUsernameExistsService = module.get<IsUsernameExistsService>(
      IsUsernameExistsService,
    );
    isUsernameExistsRepository = module.get<IsUsernameExistsRepository>(
      IsUsernameExistsRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should isUsernameExistsService be defined', () => {
    expect(isUsernameExistsService).toBeDefined();
  });

  it('should isUsernameExistsRepository be defined', () => {
    expect(isUsernameExistsRepository).toBeDefined();
  });

  it('should prismaService be defined', () => {
    expect(prismaService).toBeDefined();
  });
});
