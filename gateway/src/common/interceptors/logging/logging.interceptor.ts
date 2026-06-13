import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { finalize, Observable } from 'rxjs';
import { randomUUID } from 'node:crypto';

export interface RequestWithId extends Request {
  requestId: string;
  user: {
    sub: string;
    email: string;
  };
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest<RequestWithId>();

    request.requestId = randomUUID();

    const response = ctx.getResponse<Response>();

    const { method, originalUrl } = request;

    const start = Date.now();

    return next.handle().pipe(
      finalize(() => {
        const duration = Date.now() - start;

        const [firstTranceOfRequestId] = request.requestId.split('-');

        console.log(
          `[${method}] [${firstTranceOfRequestId}] ${originalUrl} ${response.statusCode} - ${duration}ms`,
        );
      }),
    );
  }
}
