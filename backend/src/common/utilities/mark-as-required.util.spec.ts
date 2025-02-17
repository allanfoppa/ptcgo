import { required } from './mark-as-required.util';

describe('required utility function', () => {
  it('should mark all properties as required', () => {
    type TestType = {
      a?: number;
      b?: string;
    };

    const obj: TestType = { a: 1, b: 'test' };
    const result = required(obj);

    expect(result.a).toBe(1);
    expect(result.b).toBe('test');
  });
});
