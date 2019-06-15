import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ENV } from '@config/env';
// import { HttpExceptionFilter } from './common/filters/http-expection';
import { NestFactory } from '@nestjs/core';
import { NextHandlerFilter } from './common/filters/next-handler';
import { ValidationPipe } from '@nestjs/common';
// import csurf from 'csurf';
import express from 'express';
import helmet from 'helmet';
import { join } from 'path';
import { logger } from '@core/logger';
import next from 'next';
import rateLimit from 'express-rate-limit';
import session from 'express-session';

async function bootstrap() {
  const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
  await nextApp.prepare();

  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new HttpExceptionFilter());
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

      // Warning: connect.session() MemoryStore is not
      // designed for a production environment, as it will leak
      // memory, and will not scale past a single process.
      // store: ,
    }),
  );
  // somewhere in your initialization file
  app.use(helmet());
  // app.use(csurf());
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10000, // limit each IP to 100 requests per windowMs
    }),
  );
  // TODO:
  // 跨域安全
  app.enableCors({
    origin: [/\.sunmi\.com$/],
  });

  await app.listen(ENV.PORT, () => {
    logger.info(`[ success ] listening on http://localhost:${ENV.PORT}`);
  });
}

bootstrap();
