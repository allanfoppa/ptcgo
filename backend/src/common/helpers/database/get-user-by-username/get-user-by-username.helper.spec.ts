import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByUserNameHelper } from './get-user-by-username.helper';

describe('GetUserByUserNameHelper', () => {
  let service: GetUserByUserNameHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByUserNameHelper],
    }).compile();

    service = module.get<GetUserByUserNameHelper>(GetUserByUserNameHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
