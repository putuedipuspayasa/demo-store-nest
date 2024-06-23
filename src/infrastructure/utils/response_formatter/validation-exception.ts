import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { formatResponse } from './response-formatter';

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      exception instanceof HttpException &&
      status === HttpStatus.BAD_REQUEST
    ) {
      const responseBody = exception.getResponse() as any;

      if (Array.isArray(responseBody.message)) {
        const firstError = responseBody.message[0];
        formatResponse(
          response,
          null,
          `Validation failed. ${firstError}`,
          status,
          responseBody.message,
        );
        return;
      }
    }

    formatResponse(
      response,
      null,
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error',
      status,
    );
  }
}
