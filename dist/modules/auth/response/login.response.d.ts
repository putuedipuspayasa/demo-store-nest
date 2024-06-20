import { User } from 'src/domain/entity/user.entity';
export declare class LoginResponse {
    token: string;
    type: string;
    expire: number;
    user: User;
}
