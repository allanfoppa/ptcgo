import { PipeTransform, HttpStatus } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { STATUS } from '../../enums/status.enum';
import { ResponseHelper } from '../../helpers/response/response.helper';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);

      return parsedValue;
    } catch (error) {
      return new ResponseHelper({} as Request).createResponse({
        status: STATUS.SUCCESS,
        statusCode: HttpStatus.BAD_REQUEST,
        message: `The attribute ${error.errors[0].path[0]}: ${error.errors[0].message}`,
      });
    }
  }
}
