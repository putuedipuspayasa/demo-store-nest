import { Response } from 'express';
export interface ResponseFormat<T> {
    code: number;
    message: string;
    data: T | null;
    errors?: string[];
}
export declare function formatResponse<T>(res: Response, data: T, message: string, code?: number, errors?: string[]): ResponseFormat<T>;
