import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from './logger';
import { DevelopmentLogger } from './logger-development.logger';
import { UatLogger } from './logger-uat.logger';
import { ProductionLogger } from './logger-production.logger';
import { ENVIROMENTS } from '../constants/enviroments.constant';

describe('Logger', () => {
  let logger: Logger;
  let developmentLogger: DevelopmentLogger;
  let uatLogger: UatLogger;
  let productionLogger: ProductionLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        {
          provide: DevelopmentLogger,
          useValue: { create: jest.fn() },
        },
        {
          provide: UatLogger,
          useValue: { create: jest.fn() },
        },
        {
          provide: ProductionLogger,
          useValue: { create: jest.fn() },
        },
      ],
    }).compile();

    logger = module.get<Logger>(Logger);
    developmentLogger = module.get<DevelopmentLogger>(DevelopmentLogger);
    uatLogger = module.get<UatLogger>(UatLogger);
    productionLogger = module.get<ProductionLogger>(ProductionLogger);
  });

  it('should throw an error if NODE_ENV is invalid', () => {
    process.env.NODE_ENV = 'INVALID_ENV';
    expect(() => logger.create({})).toThrow(
      `Invalid NODE_ENV value: ${process.env.NODE_ENV}`,
    );
  });

  it('should call productionLogger.create if NODE_ENV is PRODUCTION', () => {
    process.env.NODE_ENV = ENVIROMENTS.PRODUCTION;
    const logs = { message: 'test' };
    logger.create(logs);
    expect(productionLogger.create).toHaveBeenCalledWith(logs);
  });

  it('should call uatLogger.create if NODE_ENV is UAT', () => {
    process.env.NODE_ENV = ENVIROMENTS.UAT;
    const logs = { message: 'test' };
    logger.create(logs);
    expect(uatLogger.create).toHaveBeenCalledWith(logs);
  });

  it('should call developmentLogger.create if NODE_ENV is DEVELOPMENT', () => {
    process.env.NODE_ENV = ENVIROMENTS.DEVELOPMENT;
    const logs = { message: 'test' };
    logger.create(logs);
    expect(developmentLogger.create).toHaveBeenCalledWith(logs);
  });
});
