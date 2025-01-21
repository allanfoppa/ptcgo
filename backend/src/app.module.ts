import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseHelper } from './common/helpers/response/response.helper';
import { EnvironmentModule } from './common/services/enviroments-variables/enviroments-variables.module';
import { MetadataModule } from './common/helpers/metadata/metadata.module';
import { LoggerModule } from './common/logger/logger.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    EnvironmentModule,
    MetadataModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ResponseHelper,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
