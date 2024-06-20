import { LoginUsecase } from '../usecase/login.usecase';
import { LoginDto } from '../dto/login.dto';
export declare class LoginController {
    private readonly loginUsecase;
    constructor(loginUsecase: LoginUsecase);
    login(loginDto: LoginDto): Promise<import("src/infrastructure/utils/response_formatter/response-formatter").ResponseFormat<import("../response/login.response").LoginResponse>>;
}
