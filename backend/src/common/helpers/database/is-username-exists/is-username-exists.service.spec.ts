import { Test, TestingModule } from '@nestjs/testing';
import { IsUsernameExistsService } from './is-username-exists.service';

describe('IsUsernameExistsService', () => {
  let service: IsUsernameExistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsUsernameExistsService],
    }).compile();

    service = module.get<IsUsernameExistsService>(IsUsernameExistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
