import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByUsernameService } from './get-user-by-username.service';

describe('GetUserByUsernameService', () => {
  let service: GetUserByUsernameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByUsernameService],
    }).compile();

    service = module.get<GetUserByUsernameService>(GetUserByUsernameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
