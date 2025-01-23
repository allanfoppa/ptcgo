import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { STATUS } from 'src/common/enums/status.enum';

type TResponseHelper = {
  status: STATUS;
  statusCode: number;
  message: string;
  content?: any;
};

@Injectable()
export class ResponseHelper {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  createResponse({ status, statusCode, message, content }: TResponseHelper) {
    return {
      metadata: {
        status,
        statusCode,
        message,
        info: {
          path: this.request.url,
          timestamp: new Date().toISOString(),
        },
      },
      content,
    };
  }
}
