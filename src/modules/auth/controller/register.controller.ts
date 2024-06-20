import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RegisterUsecase } from '../usecase/register.usecase';
import { RegisterDto } from '../dto/register.dto';
import { formatResponse } from 'src/infrastructure/utils/response_formatter/response-formatter';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerUsecase: RegisterUsecase) {}

  @Post('register')
  async register(@Body() req: RegisterDto) {
    try {
      const login = await this.registerUsecase.register(req);
      return formatResponse(login, 'Success');
    } catch (err: any) {
      throw formatResponse(null, err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
