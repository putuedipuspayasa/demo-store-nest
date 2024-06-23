import { User } from 'src/domain/entity/user.entity';
import { StorageService } from 'src/infrastructure/utils/storage/storage.service';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { UserCredentialRepository } from '../repository/user-credential.repository';
import { UserRepository } from '../repository/user.repository';
export declare class UserUsecase {
    private userRepository;
    private userCredentialRepository;
    private dataSource;
    private readonly storageService;
    constructor(userRepository: UserRepository, userCredentialRepository: UserCredentialRepository, dataSource: DataSource, storageService: StorageService);
    private get userCounter();
    private set userCounter(value);
    create(createUserDto: CreateUserDto): Promise<User>;
    fetchAll(): Promise<User[]>;
    get(id: number): Promise<User>;
    fetchPaginate(req: FilterUserDto): Promise<import("nestjs-typeorm-paginate").Pagination<User, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: number): Promise<void>;
}
