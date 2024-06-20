import { ResponseFormat } from 'src/infrastructure/utils/response_formatter/response-formatter';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { UserUsecase } from '../usecase/user.usecase';
export declare class UserController {
    private readonly userUsecase;
    constructor(userUsecase: UserUsecase);
    create(createUserDto: CreateUserDto): Promise<ResponseFormat<import("../../../domain/entity/user.entity").User>>;
    findAll(): Promise<ResponseFormat<any>>;
    findPaginate(req: FilterUserDto): Promise<ResponseFormat<any>>;
    findOne(id: string): Promise<ResponseFormat<any>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../../../domain/entity/user.entity").User>;
    remove(id: string): Promise<void>;
}
