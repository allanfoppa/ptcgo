import {
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from './http-exception.filter'; // Adjust path if needed

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it('should catch HttpException and return the correct response format', () => {
    const exception = new HttpException('Test error message', 404);
    const host: ArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => {
          const res: Partial<Response> = { // Partial<Response> for easier mocking
            status: jest.fn().mockReturnThis(), // Mock status() method
            json: jest.fn().mockReturnThis(),   // Mock json() method
            statusCode: 200, // Initial status code (before exception)
            statusMessage: 'OK' // Initial status message
          };
          return res as Response; // Type assertion to Response
        },
        getRequest: () => {
          const req: Partial<Request> = {
            url: '/test-path',
          };
          return req as Request;
        },
      }),
    } as ArgumentsHost;

    filter.catch(exception, host);

    const response = host.switchToHttp().getResponse() as jest.Mocked<Response>; // Get the mocked response

    expect(response.status).toHaveBeenCalledWith(404); // Expect the correct status code
    expect(response.json).toHaveBeenCalledWith({
      metadata: {
        statusCode: 404, // Status code after the exception
        statusMessage: 'Not Found', // Default message for 404
        message: 'Test error message',
        info: {
          path: '/test-path',
          timestamp: expect.any(String), // Check for timestamp, but don't check the exact value
        },
      },
    });
  });

  it('should handle exceptions without a message', () => {
    const exception = new HttpException('', 500); // No message provided
    const host: ArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => {
          const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            statusCode: 200,
            statusMessage: 'OK'
          };
          return res as Response;
        },
        getRequest: () => {
          const req: Partial<Request> = {
            url: '/test-path',
          };
          return req as Request;
        },
      }),
    } as ArgumentsHost;

    filter.catch(exception, host);

    const response = host.switchToHttp().getResponse() as jest.Mocked<Response>;

    expect(response.json).toHaveBeenCalledWith({
      metadata: {
        statusCode: 500,
        statusMessage: 'Internal Server Error', // Default message for 500
        message: 'Error', // Default message when exception.message is null/undefined
        info: {
          path: '/test-path',
          timestamp: expect.any(String),
        },
      },
    });
  });

});
