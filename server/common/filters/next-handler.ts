import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HTTPHandler } from 'next-routes';
import next from 'next';
import routes from '@config/routes';

@Catch(HttpException)
export class NextHandlerFilter implements ExceptionFilter {
  handler: HTTPHandler;
  constructor(nextApp: next.Server) {
    this.handler = routes.getRequestHandler(nextApp);
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    try {
      return this.handler(request, response);
    } catch (error) {
      response.send(error);
    }
  }
}
