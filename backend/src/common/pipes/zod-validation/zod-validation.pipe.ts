import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod'; // Import ZodError for better type checking

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    console.log('ZodValidationPipe - Input:', value);
    try {
      const parsedValue = this.schema.parse(value);
      console.log('ZodValidationPipe - Output:', parsedValue);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('ZodValidationPipe - Validation Error:', error.errors);
        throw new BadRequestException(error.errors[0].message);
      }
      throw new BadRequestException('Validation failed'); // Generic error for non-Zod errors
    }
  }
}
