import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  formatResponse,
  ResponseFormat,
} from 'src/infrastructure/utils/response_formatter/response-formatter';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { UserUsecase } from '../usecase/user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly userUsecase: UserUsecase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userUsecase.create(createUserDto);
    return formatResponse(user, 'Success');
  }

  @Get('all')
  async findAll(): Promise<ResponseFormat<any>> {
    const users = await this.userUsecase.findAll();
    return formatResponse(users, 'Success');
  }

  @Get()
  async findPaginate(
    @Query() req: FilterUserDto,
  ): Promise<ResponseFormat<any>> {
    const users = await this.userUsecase.findPaginate(req);
    return formatResponse(users, 'Success');
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseFormat<any>> {
    const user = await this.userUsecase.findOne(+id);
    return formatResponse(user, 'Success');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userUsecase.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userUsecase.remove(+id);
  }
}
