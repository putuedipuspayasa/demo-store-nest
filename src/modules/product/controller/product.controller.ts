import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  formatResponse,
  ResponseFormat,
} from 'src/infrastructure/utils/response_formatter/response-formatter';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
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

  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() req: UpdateProductDto,
    @Res() res: Response,
  ) {
    try {
      const update = await this.productUsecase.update(uid, req);
      return formatResponse(res, update, 'Success');
    } catch (err: any) {
      return formatResponse(res, null, err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':uid')
  delete(@Param('uid') uid: string, @Res() res: Response) {
    const del = this.productUsecase.delete(uid);
    return formatResponse(res, del, 'Success');
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post(':uid/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/product',
        filename: (req, file, callback) => {
          // const uniqueSuffix =
          //   Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          // req.params.uid
          callback(null, `cover-${req.params.uid}${ext}`);
        },
      }),
    }),
  )
  async uploadImage(
    @Param() params,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productUsecase.uploadImage(
        params.uid,
        file.path,
      );
      return formatResponse(res, product, 'Success');
    } catch (err: any) {
      return formatResponse(res, null, err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
