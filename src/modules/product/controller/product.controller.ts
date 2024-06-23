import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  formatResponse,
  ResponseFormat,
} from 'src/infrastructure/utils/response_formatter/response-formatter';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { ProductUsecase } from '../usecase/product.usecase';

@Controller('product')
export class ProductController {
  constructor(private readonly productUsecase: ProductUsecase) {}

  @Post()
  async create(@Body() req: CreateProductDto, @Res() res: Response) {
    try {
      const user = await this.productUsecase.store(req);
      return formatResponse(res, user, 'Success');
    } catch (err: any) {
      return formatResponse(res, null, err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async fetchPaginate(
    @Query() req: FilterProductDto,
    @Res() res: Response,
  ): Promise<ResponseFormat<any>> {
    const users = await this.productUsecase.fetchPaginate(req);
    return formatResponse(res, users, 'Success');
  }

  @Get(':uid')
  async get(
    @Param('uid') uid: string,
    @Res() res: Response,
  ): Promise<ResponseFormat<any>> {
    const user = await this.productUsecase.get(uid);
    return formatResponse(res, user, 'Success');
  }

  // @Patch(':uid')
  // update(
  //   @Param('uid') uid: string,
  //   @Body() req: UpdateCategoryDto,
  //   @Res() res: Response,
  // ) {
  //   const update = this.productUsecase.update(uid, req);
  //   return formatResponse(res, update, 'Success');
  // }

  @Delete(':uid')
  delete(@Param('uid') uid: string, @Res() res: Response) {
    const del = this.productUsecase.delete(uid);
    return formatResponse(res, del, 'Success');
  }
}
