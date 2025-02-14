import { HttpExceptionFilter } from './http-exception.filter';
import { HttpException, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { Test, TestingModule } from '@nestjs/testing';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  it('should return the correct response structure', () => {
    const mockException = new HttpException('Test error', 400);
    const mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue({
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
          statusCode: 400,
          statusMessage: 'Bad Request',
        }),
        getRequest: jest.fn().mockReturnValue({
          url: '/test-url',
        }),
      }),
    } as unknown as ArgumentsHost;

    const response = mockArgumentsHost.switchToHttp().getResponse<Response>();
    const request = mockArgumentsHost.switchToHttp().getRequest<Request>();

    filter.catch(mockException, mockArgumentsHost);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      metadata: {
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Test error',
        info: {
          path: '/test-url',
          timestamp: expect.any(String),
        },
      },
    });
  });

  it('should handle exceptions without a message', () => {
    const mockException = new HttpException('', 500);
    const mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue({
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
        getRequest: jest.fn().mockReturnValue({
          url: '/test-url',
        }),
      }),
    } as unknown as ArgumentsHost;

    const response = mockArgumentsHost.switchToHttp().getResponse<Response>();
    const request = mockArgumentsHost.switchToHttp().getRequest<Request>();

    filter.catch(mockException, mockArgumentsHost);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      metadata: {
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Error',
        info: {
          path: '/test-url',
          timestamp: expect.any(String),
        },
      },
    });
  });
});
