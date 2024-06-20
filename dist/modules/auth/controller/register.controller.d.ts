import { RegisterUsecase } from '../usecase/register.usecase';
import { RegisterDto } from '../dto/register.dto';
export declare class RegisterController {
    private readonly registerUsecase;
    constructor(registerUsecase: RegisterUsecase);
    register(req: RegisterDto): Promise<import("src/infrastructure/utils/response_formatter/response-formatter").ResponseFormat<import("../../../domain/entity/user.entity").User>>;
}
