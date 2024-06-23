import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { formatResponse } from 'src/infrastructure/utils/response_formatter/response-formatter';
import { LoginDto } from '../dto/login.dto';
import { LoginUsecase } from '../usecase/login.usecase';
@Controller('auth')
export class LoginController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const login = await this.loginUsecase.login(loginDto);
      return formatResponse(res, login, 'Success');
    } catch (err: any) {
      return formatResponse(res, null, err.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
