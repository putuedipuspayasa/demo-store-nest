import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
// export interface ResponseFormat<T> {
//   code: number;
//   message: string;
//   data: T | null;
// }

// export function formatResponse<T>(
//   data: T,
//   message: string,
//   code: number = HttpStatus.OK,
// ): ResponseFormat<T> {
//   return {
//     code,
//     message,
//     data,
//   };
// }

export interface ResponseFormat<T> {
  code: number;
  message: string;
  data: T | null;
  errors?: string[];
}

export function formatResponse<T>(
  res: Response,
  data: T,
  message: string,
  code: number = HttpStatus.OK,
  errors: string[] = [],
): ResponseFormat<T> {
  const response: ResponseFormat<T> = { code, message, data, errors };

  res.status(code).json(response);
  return response;
}
