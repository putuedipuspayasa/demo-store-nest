import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
interface ClassConstructor {
    new (...args: any[]): {};
}
export declare class SerializationInterceptor implements NestInterceptor {
    private readonly dto;
    constructor(dto: ClassConstructor);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export {};
