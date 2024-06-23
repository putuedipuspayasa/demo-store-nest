import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  formatResponse,
  ResponseFormat,
} from 'src/infrastructure/utils/response_formatter/response-formatter';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FilterCategoryDto } from '../dto/filter-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryUsecase } from '../usecase/category.usecase';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryUsecase: CategoryUsecase) {}

  @Post()
  async create(@Body() req: CreateCategoryDto, @Res() res: Response) {
    try {
      const user = await this.categoryUsecase.store(req);
      return formatResponse(res, user, 'Success');
    } catch (err: any) {
      return formatResponse(res, null, err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async fetchAll(
    @Query() req: FilterCategoryDto,
    @Res() res: Response,
  ): Promise<ResponseFormat<any>> {
    const users = await this.categoryUsecase.fetchAll(req);
    return formatResponse(res, users, 'Success');
  }

  @Get()
  async fetchPaginate(
    @Query() req: FilterCategoryDto,
    @Res() res: Response,
  ): Promise<ResponseFormat<any>> {
    const users = await this.categoryUsecase.fetchPaginate(req);
    return formatResponse(res, users, 'Success');
  }

  @Get(':uid')
  async get(
    @Param('uid') uid: string,
    @Res() res: Response,
  ): Promise<ResponseFormat<any>> {
    const user = await this.categoryUsecase.get(uid);
    return formatResponse(res, user, 'Success');
  }

  @Patch(':uid')
  update(
    @Param('uid') uid: string,
    @Body() req: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    const update = this.categoryUsecase.update(uid, req);
    return formatResponse(res, update, 'Success');
  }

  @Delete(':uid')
  delete(@Param('uid') uid: string, @Res() res: Response) {
    const del = this.categoryUsecase.delete(uid);
    return formatResponse(res, del, 'Success');
  }
}
