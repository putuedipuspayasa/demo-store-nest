import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { formatResponse } from 'src/infrastructure/utils/response_formatter/response-formatter';
import { RegisterDto } from '../dto/register.dto';
import { RegisterUsecase } from '../usecase/register.usecase';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerUsecase: RegisterUsecase) {}

  @Post('register')
  async register(@Body() req: RegisterDto, @Res() res: Response) {
    try {
      const login = await this.registerUsecase.register(req);
      return formatResponse(res, login, 'Success');
    } catch (err: any) {
      return formatResponse(res, null, err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
