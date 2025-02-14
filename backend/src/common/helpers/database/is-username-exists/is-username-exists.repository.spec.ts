import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { IsUsernameExistsRepository } from './is-username-exists.repository';

describe('IsUsernameExistsRepository', () => {
  let repository: IsUsernameExistsRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsUsernameExistsRepository,
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

    repository = module.get<IsUsernameExistsRepository>(
      IsUsernameExistsRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return true if user exists', async () => {
    // Arrange
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'password',
      createdAt: new Date(),
    };
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

    // Act
    const result = await repository.isUserExists('testuser');

    // Assert
    expect(result).toBe(true);
  });

  it('should return null if user does not exist', async () => {
    // Arrange
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    // Act
    const result = await repository.isUserExists('nonexistentuser');

    // Assert
    expect(result).toBe(false);
  });
});
