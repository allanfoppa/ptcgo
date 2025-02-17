import { loggerFormat } from './logger-format.logger';

describe('loggerFormat', () => {
  it('should format log messages correctly for request type', () => {
    const logMessage = {
      timestamp: '2023-10-01T12:00:00Z',
      label: 'testLabel',
      level: 'info',
      message: {
        type: 'request',
        url: '/api/test',
        method: 'GET',
      },
    };

    const formattedMessage =
      loggerFormat().transform(logMessage)[Symbol.for('message')];
    expect(formattedMessage).toBe(
      '2023-10-01T12:00:00Z [testLabel] info [REQUEST]: {"url":"/api/test","method":"GET"}',
    );
  });

  it('should format log messages correctly for response type', () => {
    const logMessage = {
      timestamp: '2023-10-01T12:00:00Z',
      label: 'testLabel',
      level: 'info',
      message: {
        type: 'response',
        statusCode: 200,
        body: 'OK',
      },
    };

    const formattedMessage =
      loggerFormat().transform(logMessage)[Symbol.for('message')];
    expect(formattedMessage).toBe(
      '2023-10-01T12:00:00Z [testLabel] info [RESPONSE]: {"statusCode":200,"body":"OK"}',
    );
  });
});
