import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import type { Response } from 'express';
import { RequestWithId } from 'src/common/interceptors/logging/logging.interceptor';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest<RequestWithId>();
    const response = context.getResponse<Response>();

    console.log('Estou aqui dentro');
    console.log(exception);

    // Se o erro for do axios (quando algum serviço estiver fora do ar, por exemplo, retorna uma mensagem diferente)
    if (exception instanceof AxiosError) {
      // Se a requisição der timeout
      if (exception.code === 'ECONNABORTED') {
        return response.status(504).json({
          requestId: request.requestId,
          success: false,
          statusCode: 504,
          path: request.url,
          timestamp: new Date().toISOString(),
          message: 'Gateway timeout',
        });
      }

      // Retorna a rejeição do serviço
      if (exception.response) {
        return response
          .status(exception.response.status)
          .json(exception.response.data);
      }

      // Serviço indisponível
      return response.status(502).json({
        requestId: request.requestId,
        success: false,
        statusCode: 502,
        path: request.url,
        timestamp: new Date().toISOString(),
        message: 'Upstream service unavailable!',
      });
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    // Erro interno no servidor ou outro erro
    response.status(status).json({
      requestId: request.requestId,
      success: false,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
