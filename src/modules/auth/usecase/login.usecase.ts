import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtConfig } from 'src/infrastructure/jwt/jwt.config';
import { UserCredentialRepository } from 'src/modules/user/repository/user-credential.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../response/login.response';

@Injectable()
export class LoginUsecase {
  constructor(
    private userRepository: UserRepository,
    private userCredentialRepository: UserCredentialRepository,
    private jwtService: JwtService,
  ) {}

  async login(req: LoginDto): Promise<LoginResponse> {
    const username = req.username.toLowerCase();
    const user = await this.userRepository.getByEmail(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // throw new Error(user.uid);
    const userPassword = await this.userCredentialRepository.getActivePassword(
      user.uid,
    );

    if (!userPassword) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(
      req.password,
      userPassword.value,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    const accessToken = await this.jwtService.signAsync({
      uid: user.uid,
      username: user.email,
    });

    return {
      access_token: accessToken,
      token_type: JwtConfig.TOKEN_TYPE,
      expires_in: JwtConfig.EXPIRE_IN,
      user: user,
    };
  }
}
