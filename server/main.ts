import * as bodyParser from 'body-parser';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NextHandlerFilter } from '@helpers/filters/next-handler';
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
  app.useGlobalFilters(new NextHandlerFilter(nextApp));

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb' }));
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
  // 跨域安全
  app.enableCors({
    origin: [/\.sunmi\.com$/],
  });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    logger.info(`[ success ] listening on http://localhost:${PORT}`);
  });
}

bootstrap();
