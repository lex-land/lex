import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HTTPHandler } from 'next-routes';
// import next from 'next';
// import routes from '@config/routes';

@Catch(HttpException)
export class NextHandlerFilter implements ExceptionFilter {
  handler: HTTPHandler;
  constructor(nextApp: any) {
    // this.handler = routes.getRequestHandler(nextApp);
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    try {
      if (status === 404) {
        return this.handler(request, response);
      } else {
        return response.send(exception.getResponse());
      }
    } catch (error) {
      response.send(error);
    }
  }
}
