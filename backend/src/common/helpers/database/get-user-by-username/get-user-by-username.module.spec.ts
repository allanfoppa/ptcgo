import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByUsernameModule } from './get-user-by-username.module';
import { GetUserByUserNameHelper } from './get-user-by-username.helper';
import { GetUserByUsernameRepository } from './get-user-by-username.repository';
import { PrismaService } from '@common/services/prisma/prisma.service';

describe('GetUserByUsernameModule', () => {
  let getUserByUserNameHelper: GetUserByUserNameHelper;
  let getUserByUsernameRepository: GetUserByUsernameRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GetUserByUsernameModule],
    }).compile();

    getUserByUserNameHelper = module.get<GetUserByUserNameHelper>(
      GetUserByUserNameHelper,
    );
    getUserByUsernameRepository = module.get<GetUserByUsernameRepository>(
      GetUserByUsernameRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should getUserByUserNameHelper be defined', () => {
    expect(getUserByUserNameHelper).toBeDefined();
  });

  it('should getUserByUsernameRepository be defined', () => {
    expect(getUserByUsernameRepository).toBeDefined();
  });

  it('should prismaService be defined', () => {
    expect(prismaService).toBeDefined();
  });
});
