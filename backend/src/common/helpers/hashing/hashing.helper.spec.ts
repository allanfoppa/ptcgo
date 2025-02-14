import { HashingHelper } from './hashing.helper';
import * as bcrypt from 'bcrypt';

describe('HashingHelper', () => {
  let hashingHelper: HashingHelper;
  const saltRounds = 10;
  const password = 'testPassword';
  const hashedPassword = 'hashedPassword';

  beforeAll(() => {
    process.env.SALT_ROUNDS = saltRounds.toString();
    hashingHelper = new HashingHelper();
  });

  it('should hash the password correctly', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

    const result = await hashingHelper.hashPassword({ password });

    expect(result).toBe(hashedPassword);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, saltRounds);
  });

  it('should throw an error if bcrypt.hash fails', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockRejectedValue(new Error('Hashing failed') as never);

    await expect(hashingHelper.hashPassword({ password })).rejects.toThrow(
      'Hashing failed',
    );
  });
});
