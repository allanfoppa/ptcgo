import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Logger } from './logger';
import { DevelopmentLogger } from './logger-development.logger';
import { UatLogger } from './logger-uat.logger';
import { ProductionLogger } from './logger-production.logger';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [Logger, DevelopmentLogger, UatLogger, ProductionLogger],
  exports: [Logger],
})
export class LoggerModule {}
