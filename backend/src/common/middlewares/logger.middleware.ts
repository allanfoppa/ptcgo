import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private loggerInstance: any = '';

  constructor(logger: Logger) {
    this.loggerInstance = logger.create.bind(logger);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const logRequest = () => {
      const { method, url, body, params, query } = req;
      const requestLog = {
        type: 'request',
        URL: url,
        METHOD: method,
        BODY: JSON.stringify(body, null, 2),
        PARAM: JSON.stringify(params, null, 2),
        QUERY: JSON.stringify(query, null, 2),
        CALL_AT: new Date().toISOString(),
      };
      this.loggerInstance(requestLog);
    };

    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks: Buffer[] = [];

    res.write = function (chunk: any, ...args: any[]) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return oldWrite.apply(res, [chunk, ...args]);
    };

    res.end = function (chunk: any, ...args: any[]) {
      if (chunk) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const result = oldEnd.apply(res, [chunk, ...args]);
      return result;
    };

    const logResponse = () => {
      const { statusCode, statusMessage } = res;
      const responseBody = Buffer.concat(chunks).toString('utf8');
      const responseLog = {
        type: 'response',
        STATUS: statusCode,
        MESSAGE: statusMessage,
        BODY: responseBody,
        RESPONSE_AT: new Date().toISOString(),
        DURATION: `${Date.now() - start}ms`,
      };
      this.loggerInstance(responseLog);
    };

    res.on('finish', logResponse);

    logRequest();
    next();
  }
}
