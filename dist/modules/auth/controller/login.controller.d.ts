import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { LoginUsecase } from '../usecase/login.usecase';
export declare class LoginController {
    private readonly loginUsecase;
    constructor(loginUsecase: LoginUsecase);
    login(loginDto: LoginDto, res: Response): Promise<import("src/infrastructure/utils/response_formatter/response-formatter").ResponseFormat<any>>;
}
