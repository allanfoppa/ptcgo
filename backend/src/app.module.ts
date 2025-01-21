import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseHelper } from './common/helpers/response/response.helper';
import { EnvironmentModule } from './common/services/enviroments-variables/enviroments-variables.module';
import { MetadataModule } from './common/helpers/metadata/metadata.module';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvironmentModule,
    MetadataModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseHelper],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
