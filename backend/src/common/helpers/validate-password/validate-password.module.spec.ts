import { Test, TestingModule } from '@nestjs/testing';
import { ValidatePasswordModule } from './validate-password.module';
import { ValidatePasswordHelper } from './validate-password.helper';

describe('ValidatePasswordModule', () => {
  let validatePasswordHelper: ValidatePasswordHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ValidatePasswordModule],
    }).compile();

    validatePasswordHelper = module.get<ValidatePasswordHelper>(
      ValidatePasswordHelper,
    );
  });

  it('should be defined', () => {
    expect(validatePasswordHelper).toBeDefined();
  });
});
