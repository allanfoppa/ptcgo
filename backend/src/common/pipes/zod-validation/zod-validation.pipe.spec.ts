import { ZodValidationPipe } from './zod-validation.pipe';
import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

describe('ZodValidationPipe', () => {
  it('should validate and transform the value correctly', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });
    const pipe = new ZodValidationPipe(schema);
    const value = { name: 'Allan', age: 38 };

    expect(pipe.transform(value)).toEqual(value);
  });

  it('should throw BadRequestException for invalid value', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });
    const pipe = new ZodValidationPipe(schema);
    const value = { name: 'Allan', age: 'thirty eight' };

    expect(() => pipe.transform(value)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException with correct error message', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });
    const pipe = new ZodValidationPipe(schema);
    const value = { name: 'Allan', age: 'thirty' };

    try {
      pipe.transform(value);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toContain('Expected number, received string');
    }
  });
});
