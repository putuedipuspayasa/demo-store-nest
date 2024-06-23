import { Response } from 'express';
import { RegisterDto } from '../dto/register.dto';
import { RegisterUsecase } from '../usecase/register.usecase';
export declare class RegisterController {
    private readonly registerUsecase;
    constructor(registerUsecase: RegisterUsecase);
    register(req: RegisterDto, res: Response): Promise<import("src/infrastructure/utils/response_formatter/response-formatter").ResponseFormat<any>>;
}
