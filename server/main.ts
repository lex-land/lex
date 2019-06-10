import { AppModule } from './app.module';
import { ENV } from '@config/env';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-expection';
import { NestFactory } from '@nestjs/core';
import { NextHandlerFilter } from './common/filters/next-handler';
import express from 'express';
import { logger } from '@core/logger';
import next from 'next';
import session from 'express-session';

async function bootstrap() {
  const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
  await nextApp.prepare();

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new NextHandlerFilter(nextApp));

  // 会话设置
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,

      // https://github.com/expressjs/session#cookiesecure
      // cookie: { secure: true },

      // connect.sid
      // https://github.com/expressjs/session#name

      // TODO:
      // Warning: connect.session() MemoryStore is not
      // designed for a production environment, as it will leak
      // memory, and will not scale past a single process.
      // store: ,
    }),
  );

  // 跨域安全
  app.enableCors({
    origin: [/\.sunmi\.com$/],
  });

  await app.listen(ENV.PORT, () => {
    logger.info(`[ success ] listening on http://localhost:${ENV.PORT}`);
  });
}

bootstrap();
