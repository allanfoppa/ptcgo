import { ResponseHelper } from './response.helper'; // Adjust path if needed

describe('ResponseHelper', () => {
  it('should return a success object with default message', () => {
    const data = { name: 'Test Data' };
    const result = ResponseHelper.success({ message: 'Success', data });
    expect(result).toEqual({ message: 'Success', data });
  });

  it('should return a success object with custom message', () => {
    const data = { name: 'Test Data' };
    const message = 'Custom Success Message';
    const result = ResponseHelper.success({ message, data });
    expect(result).toEqual({ message, data });
  });

  it('should handle undefined data', () => {
    const result = ResponseHelper.success({ message: 'Test', data: undefined });
    expect(result).toEqual({ message: 'Test', data: undefined });
  });

  it('should handle null data', () => {
    const result = ResponseHelper.success({ message: 'Test', data: null });
    expect(result).toEqual({ message: 'Test', data: null });
  });

  it('should handle no data at all', () => {
    const result = ResponseHelper.success({ message: 'Test', data: undefined });
    expect(result).toEqual({ message: 'Test', data: undefined });
  })
});
