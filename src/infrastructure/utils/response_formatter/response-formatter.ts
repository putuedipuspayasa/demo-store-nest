import { HttpStatus } from '@nestjs/common';

export interface ResponseFormat<T> {
  statusCode: number;
  message: string;
  data: T | null;
}

export function formatResponse<T>(
  data: T,
  message: string,
  statusCode: number = HttpStatus.OK,
): ResponseFormat<T> {
  return {
    statusCode,
    message,
    data,
  };
}
