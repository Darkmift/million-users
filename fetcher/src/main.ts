/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import loggerFactory from './util/winston.util';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const port = configService.get('FETCHER_PORT') || 3000;
  const token = configService.get('LOGTAIL_TOKEN');
  console.log('🚀 ~ file: main.ts:21 ~ bootstrap ~ token:', { port, token });

  app.useLogger(loggerFactory(token));

  await app.listen(port);
  Logger.log(
    `🚀FETCHER Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
