import { User } from 'src/domain/entity/user.entity';

export class LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}
