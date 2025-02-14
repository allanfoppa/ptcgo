import { Test, TestingModule } from '@nestjs/testing';
import { IsUsernameExistsService } from './is-username-exists.service';
import { IsUsernameExistsRepository } from './is-username-exists.repository';

describe('IsUsernameExistsService', () => {
  let service: IsUsernameExistsService;
  let repository: IsUsernameExistsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsUsernameExistsService,
        {
          provide: IsUsernameExistsRepository,
          useValue: {
            isUserExists: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IsUsernameExistsService>(IsUsernameExistsService);
    repository = module.get<IsUsernameExistsRepository>(
      IsUsernameExistsRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true user when it exists', async () => {
    // Arrange
    (repository.isUserExists as jest.Mock).mockResolvedValue(true); // Set up the mock return value

    // Act
    const user = await service.isUserExists('testuser');

    // Assert
    expect(repository.isUserExists).toHaveBeenCalledWith('testuser'); // Verify repository was called
    expect(user).toEqual(true); // Verify the returned user
  });

  it('should return false user when it exists', async () => {
    // Arrange
    (repository.isUserExists as jest.Mock).mockResolvedValue(false); // Set up the mock return value

    // Act
    const user = await service.isUserExists('testuser');

    // Assert
    expect(repository.isUserExists).toHaveBeenCalledWith('testuser'); // Verify repository was called
    expect(user).toEqual(false); // Verify the returned user
  });
});
