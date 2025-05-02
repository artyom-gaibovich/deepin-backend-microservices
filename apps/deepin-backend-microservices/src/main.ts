/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ColoredLogger } from '../../deepin-backend-admin/src/libs/logging-interceptor';
import * as process from 'node:process';

async function bootstrap() {
  const logger = new ColoredLogger();
  const app = await NestFactory.create(AppModule);
  app.init();
  /*const port = 4200;
  await app.listen(port, () => {
    logger.log(`Server started port : ${port}`);
  });*/
}

bootstrap();
