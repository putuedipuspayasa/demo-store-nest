import { User } from 'src/domain/entity/user.entity';

export class LoginResponse {
  token: string;
  type: string;
  expire: number;
  user: User;
}
