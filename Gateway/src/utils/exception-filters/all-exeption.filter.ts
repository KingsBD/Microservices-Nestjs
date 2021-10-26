import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('------------->exception', exception);
    // super.catch(exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultMessage =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      internalError:
        typeof exception === 'object' &&
        Object.prototype.hasOwnProperty.call(exception, 'statusCode')
          ? Object.prototype.valueOf.call(exception)?.statusCode
          : '0000',
      message:
        typeof exception === 'object' &&
        Object.prototype.hasOwnProperty.call(exception, 'statusCode')
          ? Object.prototype.valueOf.call(exception)?.error
          : defaultMessage,
    });
  }
}
