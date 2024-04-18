import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import * as cookieParser from 'cookie-parser';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  await app.listen(3001);
}

bootstrap().then();
