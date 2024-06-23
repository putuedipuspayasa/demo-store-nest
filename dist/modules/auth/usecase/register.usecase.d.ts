import { User } from 'src/domain/entity/user.entity';
import { StorageService } from 'src/infrastructure/utils/storage/storage.service';
import { CompanyRepository } from 'src/modules/company/repository/company.repository';
import { UserCredentialRepository } from 'src/modules/user/repository/user-credential.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { DataSource } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
export declare class RegisterUsecase {
    private userRepository;
    private userCredentialRepository;
    private dataSource;
    private readonly storageService;
    private companyRepository;
    constructor(userRepository: UserRepository, userCredentialRepository: UserCredentialRepository, dataSource: DataSource, storageService: StorageService, companyRepository: CompanyRepository);
    private get userCounter();
    private set userCounter(value);
    register(req: RegisterDto): Promise<User>;
}
