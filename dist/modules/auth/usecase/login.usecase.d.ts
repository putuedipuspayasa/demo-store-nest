import { UserCredentialRepository } from 'src/modules/user/repository/user-credential.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../response/login.response';
import { JwtService } from '@nestjs/jwt';
export declare class LoginUsecase {
    private userRepository;
    private userCredentialRepository;
    private jwtService;
    constructor(userRepository: UserRepository, userCredentialRepository: UserCredentialRepository, jwtService: JwtService);
    login(req: LoginDto): Promise<LoginResponse>;
}
