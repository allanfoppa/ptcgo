import { PipeTransform, HttpStatus } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { response } from 'express';
import { STATUS } from '../../enums/status.enum';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);

      return parsedValue;
    } catch (error) {
      return response.status(HttpStatus.OK).json({
        metadata: {
          status: STATUS.SUCCESS,
          statusCode: HttpStatus.BAD_REQUEST,
          message: `The attribute ${error.errors[0].path[0]}: ${error.errors[0].message}`,
          info: {
            path: '/',
            timestamp: new Date().toISOString(),
          },
        },
      });
    }
  }
}
