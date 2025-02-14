import { createLogger, format, transports } from 'winston';
import { loggerFormat } from './logger-format.logger';
import { ENVIROMENTS } from '../constants/enviroments.constant';
import { LOGS_PATH } from './logger-paths.logger';
import { Injectable } from '@nestjs/common';

const { combine, timestamp, label } = format;

@Injectable()
export class ProductionLogger {
  public create(logs: any): object {
    return createLogger({
      level: 'warn',
      format: combine(
        label({ label: ENVIROMENTS.PRODUCTION }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        loggerFormat(),
      ),
      transports: [
        new transports.File({ filename: LOGS_PATH.PRODUCTION, level: 'error' }),
        new transports.File({ filename: LOGS_PATH.COMBINED }),
        new transports.Console(),
      ],
    }).warn(logs);
  }
}
