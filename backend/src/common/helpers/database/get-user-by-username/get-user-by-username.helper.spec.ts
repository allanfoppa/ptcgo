import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByUserNameHelper } from './get-user-by-username.helper';
import { GetUserByUsernameRepository } from './get-user-by-username.repository';

describe('GetUserByUserNameHelper', () => {
  let helper: GetUserByUserNameHelper;
  let repository: GetUserByUsernameRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByUserNameHelper,
        {
          provide: GetUserByUsernameRepository,
          useValue: {
            getUser: jest.fn(),
          },
        },
      ],
    }).compile();

    helper = module.get<GetUserByUserNameHelper>(GetUserByUserNameHelper);
    repository = module.get<GetUserByUsernameRepository>(GetUserByUsernameRepository);
  });

  it('should be defined', () => {
    expect(helper).toBeDefined();
  });

  it('should return the user when it exists', async () => {
    const mockUser = { id: 1, username: 'testuser', password: 'password', createdAt: new Date() };
    (repository.getUser as jest.Mock).mockResolvedValue(mockUser); // Set up the mock return value

    const user = await helper.getUser('testuser');

    expect(repository.getUser).toHaveBeenCalledWith('testuser'); // Verify repository was called
    expect(user).toEqual(mockUser); // Verify the returned user
  });
});

