import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  formatResponse,
  ResponseFormat,
} from 'src/infrastructure/utils/response_formatter/response-formatter';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UserUsecase } from '../usecase/user.usecase';

@Controller('user')
export class UserController {
  constructor(private readonly userUsecase: UserUsecase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userUsecase.create(createUserDto);
    return formatResponse(res, user, 'Success');
  }

  @Get('all')
  async fetchAll(@Res() res: Response): Promise<ResponseFormat<any>> {
    const users = await this.userUsecase.fetchAll();
    return formatResponse(res, users, 'Success');
  }

  @Get()
  async fetchPaginate(
    @Query() req: FilterUserDto,
    @Res() res: Response,
  ): Promise<ResponseFormat<any>> {
    const users = await this.userUsecase.fetchPaginate(req);
    return formatResponse(res, users, 'Success');
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<ResponseFormat<any>> {
  //   const user = await this.userUsecase.findOne(+id);
  //   return formatResponse(user, 'Success');
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userUsecase.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userUsecase.remove(+id);
  // }
}
