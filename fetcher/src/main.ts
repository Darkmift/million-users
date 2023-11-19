/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import * as dotenv from 'dotenv';
dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.FETCHER_PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀FETCHER Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
