import { Body, Controller, Post } from '@nestjs/common';
import { LoginUsecase } from '../usecase/login.usecase';
import { LoginDto } from '../dto/login.dto';
import { formatResponse } from 'src/infrastructure/utils/response_formatter/response-formatter';
import { HttpStatus } from '@nestjs/common';
@Controller('auth')
export class LoginController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const login = await this.loginUsecase.login(loginDto);
      return formatResponse(login, 'Success');
    } catch (err: any) {
      throw formatResponse(null, err.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
