import { Response } from 'express';
import { ResponseFormat } from 'src/infrastructure/utils/response_formatter/response-formatter';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UserUsecase } from '../usecase/user.usecase';
export declare class UserController {
    private readonly userUsecase;
    constructor(userUsecase: UserUsecase);
    create(createUserDto: CreateUserDto, res: Response): Promise<ResponseFormat<import("../../../domain/entity/user.entity").User>>;
    fetchAll(res: Response): Promise<ResponseFormat<any>>;
    fetchPaginate(req: FilterUserDto, res: Response): Promise<ResponseFormat<any>>;
}
