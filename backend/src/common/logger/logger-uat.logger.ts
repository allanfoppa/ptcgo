import { createLogger, format, transports } from 'winston';
import { loggerFormat } from './logger-format.logger';
import { ENVIROMENTS } from '../constants/enviroments.constant';
import { LOGS_PATH } from './logger-paths.logger';
import { Injectable } from '@nestjs/common';

const { combine, timestamp, label } = format;

@Injectable()
export class UatLogger {

  public create(logs: any): object {
    return createLogger({
      level: 'info',
      format: combine(
        format.colorize(),
        label({ label: ENVIROMENTS.UAT }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        loggerFormat()
      ),
      transports: [
        new transports.File({ filename: LOGS_PATH.UAT, level: 'error' }),
        new transports.File({ filename: LOGS_PATH.COMBINED }),
        new transports.Console()
      ]
    }).info(logs);
  };
};
