import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

dotenv.config({ path: process.cwd() + '/.env' });

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
