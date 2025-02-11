import { ResponseInterceptor } from './response.interceptor'; // Adjust path if needed
import {
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { of } from 'rxjs';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
  });

  it('should intercept the response and format it correctly', () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({ url: '/test-path' }),
        getResponse: () => ({ statusCode: 200, statusMessage: 'OK' }),
      }),
    } as ExecutionContext;

    const handler: CallHandler = {
      handle: () => of({ data: { name: 'Test Data' }, message: 'Data retrieved' }), // Simulate the handler's response
    };

    const observable = interceptor.intercept(context, handler);
    observable.subscribe((response) => {
      expect(response).toEqual({
        metadata: {
          statusCode: 200,
          statusMessage: 'OK',
          message: 'Data retrieved',
          info: {
            path: '/test-path',
            timestamp: expect.any(String),
          },
        },
        data: { name: 'Test Data' },
      });
    });
  });

  it('should handle responses without a message', () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({ url: '/test-path' }),
        getResponse: () => ({ statusCode: 200, statusMessage: 'OK' }),
      }),
    } as ExecutionContext;

    const handler: CallHandler = {
      handle: () => of({ data: { name: 'Test Data' } }), // No message
    };

    const observable = interceptor.intercept(context, handler);
    observable.subscribe((response) => {
      expect(response).toEqual({
        metadata: {
          statusCode: 200,
          statusMessage: 'OK',
          message: 'Success', // Default message
          info: {
            path: '/test-path',
            timestamp: expect.any(String),
          },
        },
        data: { name: 'Test Data' },
      });
    });
  });

  it('should handle responses with just data', () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({ url: '/test-path' }),
        getResponse: () => ({ statusCode: 200, statusMessage: 'OK' }),
      }),
    } as ExecutionContext;

    const handler: CallHandler = {
      handle: () => of({ name: 'Test Data' }), // Just data
    };

    const observable = interceptor.intercept(context, handler);
    observable.subscribe((response) => {
      expect(response).toEqual({
        metadata: {
          statusCode: 200,
          statusMessage: 'OK',
          message: 'Success', // Default message
          info: {
            path: '/test-path',
            timestamp: expect.any(String),
          },
        },
        data: { name: 'Test Data' },
      });
    });
  });


});
