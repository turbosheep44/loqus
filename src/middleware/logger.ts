import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl } = request;

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length') ?? 0;

      this.logger.log(
        `${method} ${baseUrl} ${statusCode} ${contentLength} ${ip}`,
      );
    });

    next();
  }
}
