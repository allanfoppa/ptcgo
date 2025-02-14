import { Test, TestingModule } from '@nestjs/testing';
import { IsUsernameExistsService } from './is-username-exists.service';
import { IsUsernameExistsRepository } from './is-username-exists.repository';
import { PrismaService } from '@common/services/prisma/prisma.service';

describe('IsUsernameExistsService', () => {
  let service: IsUsernameExistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsUsernameExistsService,
        IsUsernameExistsRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<IsUsernameExistsService>(IsUsernameExistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
