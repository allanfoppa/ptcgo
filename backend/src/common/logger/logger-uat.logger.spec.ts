import { createLogger, transports } from 'winston';
import { LOGS_PATH } from './logger-paths.logger';
import { UatLogger } from './logger-uat.logger';

jest.mock('winston', () => ({
  createLogger: jest.fn().mockImplementation(() => ({
    format: jest.fn(),
    info: jest.fn(),
    transports: [
      new transports.File({}),
      new transports.File({}),
      new transports.Console({}),
    ],
  })),
  format: {
    combine: jest.fn().mockReturnValue('combined format'),
    colorize: jest.fn().mockReturnValue('colorized format'),
    label: jest.fn().mockReturnValue('labeled format'),
    timestamp: jest.fn().mockReturnValue('timestamped format'),
    printf: jest.fn().mockReturnValue('printf format'),
  },
  transports: {
    File: jest.fn(),
    Console: jest.fn(),
  },
}));

describe('UatLogger', () => {
  let uatLogger: UatLogger;

  beforeEach(() => {
    uatLogger = new UatLogger();
  });

  it('should create a logger with the correct configuration', () => {
    uatLogger.create({ message: 'test log' });

    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'info',
        format: 'combined format',
        transports: expect.any(Array),
      }),
    );
  });

  it('should configure the logger with the correct transports', () => {
    uatLogger.create({ message: 'test log' });

    expect(transports.File).toHaveBeenCalledWith({
      filename: LOGS_PATH.UAT,
      level: 'error',
    });
    expect(transports.File).toHaveBeenCalledWith({
      filename: LOGS_PATH.COMBINED,
    });
    expect(transports.Console).toHaveBeenCalled();
  });

  it('should configure the logger with the correct format', () => {
    uatLogger.create({ message: 'test log' });

    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        format: 'combined format',
      }),
    );
  });
});
