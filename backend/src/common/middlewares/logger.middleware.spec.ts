import { Test, TestingModule } from '@nestjs/testing';
import { LoggerMiddleware } from './logger.middleware';
import { Logger } from '../logger/logger';
import { Request, Response, NextFunction } from 'express';

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;
  let logger: Logger;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerMiddleware,
        {
          provide: Logger,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    loggerMiddleware = module.get<LoggerMiddleware>(LoggerMiddleware);
    logger = module.get<Logger>(Logger);
    req = {
      method: 'GET',
      url: '/test',
      body: {},
      params: {},
      query: {},
    } as Request;
    res = {
      write: jest.fn(),
      end: jest.fn(),
      on: jest.fn(),
      statusCode: 200,
      statusMessage: 'OK',
    } as unknown as Response;
    next = jest.fn();
  });

  it('should log request and response', () => {
    const logSpy = jest.spyOn(logger, 'create');
    const start = Date.now();

    loggerMiddleware.use(req, res, next);

    expect(logSpy).toHaveBeenCalledWith({
      type: 'request',
      URL: req.url,
      METHOD: req.method,
      BODY: JSON.stringify(req.body, null, 2),
      PARAM: JSON.stringify(req.params, null, 2),
      QUERY: JSON.stringify(req.query, null, 2),
      CALL_AT: expect.any(String),
    });

    const finishCallback = (res.on as jest.Mock).mock.calls[0][1];
    finishCallback();

    expect(logSpy).toHaveBeenCalledWith({
      type: 'response',
      STATUS: res.statusCode,
      MESSAGE: res.statusMessage,
      BODY: '',
      RESPONSE_AT: expect.any(String),
      DURATION: expect.stringMatching(/^\d+ms$/),
    });

    expect(next).toHaveBeenCalled();
  });

  it('should capture response body', () => {
    const logSpy = jest.spyOn(logger, 'create');
    const chunk = Buffer.from('response body');

    res.write = jest.fn((chunk: any, encodingOrCallback?: BufferEncoding | ((error: Error | null | undefined) => void), callback?: (error: Error | null | undefined) => void) => {
      if (callback) callback(null);
      return true;
    });
    res.end = jest.fn((chunk?: any, encodingOrCallback?: BufferEncoding | ((error: Error | null | undefined) => void), callback?: (error: Error | null | undefined) => void) => {
      if (callback) callback(null);
      return res;
    });

    loggerMiddleware.use(req, res, next);

    res.write(chunk);
    res.end(chunk);

    const finishCallback = (res.on as jest.Mock).mock.calls[0][1];
    finishCallback();

    expect(logSpy).toHaveBeenCalledWith({
      type: 'response',
      STATUS: res.statusCode,
      MESSAGE: res.statusMessage,
      BODY: 'response bodyresponse body',
      RESPONSE_AT: expect.any(String),
      DURATION: expect.stringMatching(/^\d+ms$/),
    });
  });
});
