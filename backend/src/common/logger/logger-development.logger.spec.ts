import { DevelopmentLogger } from './logger-development.logger';
import { createLogger, transports } from 'winston';
import { LOGS_PATH } from './logger-paths.logger';

jest.mock('winston', () => ({
  createLogger: jest.fn().mockImplementation(() => ({
    debug: jest.fn(),
    format: jest.fn(),
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

describe('DevelopmentLogger', () => {
  let developmentLogger: DevelopmentLogger;

  beforeEach(() => {
    developmentLogger = new DevelopmentLogger();
  });

  it('should create a logger with the correct configuration', () => {
    developmentLogger.create({ message: 'test log' });

    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'debug',
        format: 'combined format',
        transports: expect.any(Array),
      }),
    );
  });

  it('should configure the logger with the correct transports', () => {
    developmentLogger.create({ message: 'test log' });

    expect(transports.File).toHaveBeenCalledWith({
      filename: LOGS_PATH.DEBUG,
      level: 'error',
    });
    expect(transports.File).toHaveBeenCalledWith({
      filename: LOGS_PATH.COMBINED,
    });
    expect(transports.Console).toHaveBeenCalled();
  });

  it('should configure the logger with the correct format', () => {
    developmentLogger.create({ message: 'test log' });

    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        format: 'combined format',
      }),
    );
  });
});
