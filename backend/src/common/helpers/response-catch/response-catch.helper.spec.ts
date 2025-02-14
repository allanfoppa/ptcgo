import { ResponseCatchHelper } from './response-catch.helper';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

describe('ResponseCatchHelper', () => {
  it('should throw the same HttpException error', () => {
    const error = new HttpException('Forbidden', 403);
    expect(() => ResponseCatchHelper.catch({ error })).toThrow(HttpException);
    expect(() => ResponseCatchHelper.catch({ error })).toThrow('Forbidden');
  });

  it('should throw InternalServerErrorException for non-HttpException errors', () => {
    const error = new Error('Some error');
    expect(() => ResponseCatchHelper.catch({ error })).toThrow(
      InternalServerErrorException,
    );
    expect(() => ResponseCatchHelper.catch({ error })).toThrow('Some error');
  });
});
