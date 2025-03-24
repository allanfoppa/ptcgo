import { ORDER } from './order.enum';

describe('ORDER Enum', () => {
  it('should have ASC value as "asc"', () => {
    expect(ORDER.ASC).toBe('asc');
  });

  it('should have DESC value as "desc"', () => {
    expect(ORDER.DESC).toBe('desc');
  });
});
