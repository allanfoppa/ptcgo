import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      metadata: {
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        message: exception?.message || 'Error',
        info: {
          path: request.url,
          timestamp: new Date().toISOString(),
        },
      },
    });
  }
}
