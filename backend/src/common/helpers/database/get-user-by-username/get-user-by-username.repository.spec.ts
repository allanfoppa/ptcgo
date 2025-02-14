import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { GetUserByUsernameRepository } from './get-user-by-username.repository';

describe('GetUserByUsernameRepository', () => {
  let repository: GetUserByUsernameRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByUsernameRepository,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<GetUserByUsernameRepository>(
      GetUserByUsernameRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return a user if found', async () => {
    // Arrange
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'password',
      createdAt: new Date(),
    };
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

    // Act
    const result = await repository.getUser('testuser');

    // Assert
    expect(result).toEqual(mockUser);
  });

  it('should return null if no user is found', async () => {
    // Arrange
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    // Act
    const result = await repository.getUser('nonexistentuser');

    // Assert
    expect(result).toBeNull();
  });
});
