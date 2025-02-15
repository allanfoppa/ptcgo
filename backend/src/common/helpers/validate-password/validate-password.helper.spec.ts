import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { ValidatePasswordHelper } from './validate-password.helper';

describe('ValidatePasswordHelper', () => {
  let validatePasswordHelper: ValidatePasswordHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidatePasswordHelper],
    }).compile();

    validatePasswordHelper = module.get<ValidatePasswordHelper>(
      ValidatePasswordHelper,
    );
  });

  it('should return true for valid password comparison', async () => {
    // ARRANGE
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // ACT
    const result = await validatePasswordHelper.compare({
      password,
      hashedPassword,
    });

    // ASSERT
    expect(result).toBe(true);
  });

  it('should return false for invalid password comparison', async () => {
    // ARRANGE
    const password = 'password123';
    const hashedPassword = await bcrypt.hash('differentPassword', 10);

    // ACT
    const result = await validatePasswordHelper.compare({
      password,
      hashedPassword,
    });

    // ASSERT
    expect(result).toBe(false);
  });
});
