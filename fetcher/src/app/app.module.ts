import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../../.env.${process.env.NODE_ENV}`, // Specify the custom .env file path
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
