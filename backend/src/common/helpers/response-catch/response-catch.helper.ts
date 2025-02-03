import { HttpException, InternalServerErrorException } from '@nestjs/common';

type TResponseCatchHelper = {
  error: Error;
};

export class ResponseCatchHelper {
  static catch({ error }: TResponseCatchHelper): object {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException(error.message);
  }
}
