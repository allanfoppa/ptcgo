import { STATUS } from './status.enum';

describe('STATUS Enum', () => {
  it('should have a SUCCESS status', () => {
    expect(STATUS.SUCCESS).toBe('success');
  });

  it('should have an ERROR status', () => {
    expect(STATUS.ERROR).toBe('error');
  });
});
