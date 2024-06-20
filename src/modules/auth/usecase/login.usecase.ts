import { Injectable } from '@nestjs/common';
import { UserCredentialRepository } from 'src/modules/user/repository/user-credential.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../response/login.response';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from 'src/infrastructure/jwt/jwt.config';

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

    // throw new Error('valid');
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
      token: accessToken,
      type: JwtConfig.TOKEN_TYPE,
      expire: JwtConfig.EXPIRE_IN,
      user: user,
    };
  }
}
