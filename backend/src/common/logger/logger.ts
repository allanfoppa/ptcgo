import { Injectable } from '@nestjs/common';
import { ENVIROMENTS } from '../constants/enviroments.constant';
import { DevelopmentLogger } from './logger-development.logger';
import { UatLogger } from './logger-uat.logger';
import { ProductionLogger } from './logger-production.logger';

@Injectable()
export class Logger {
  constructor(
    private readonly developmentLogger: DevelopmentLogger,
    private readonly uatLogger: UatLogger,
    private readonly productionLogger: ProductionLogger,
  ) {}

  public create(logs: any): any {
    const isInvalidEnv = !Object.values(ENVIROMENTS).includes(
      process.env.NODE_ENV || '',
    );

    if (isInvalidEnv) {
      throw new Error(`Invalid NODE_ENV value: ${process.env.NODE_ENV}`);
    }

    if (process.env.NODE_ENV === ENVIROMENTS.PRODUCTION)
      return this.productionLogger.create(logs);

    if (process.env.NODE_ENV === ENVIROMENTS.UAT)
      return this.uatLogger.create(logs);

    if (process.env.NODE_ENV === ENVIROMENTS.DEVELOPMENT)
      return this.developmentLogger.create(logs);
  }
}
