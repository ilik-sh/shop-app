import { Controller, HttpCode, Get, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { SearchDto } from 'domain/dtos/search.dto';
import { ApiRequestException } from 'exceptions/apiRequestException';
import { ErrorCodes } from 'enums/errorCode.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(200)
  @Get('')
  async getAll() {
    return await this.productService.getAll()
  }

  @HttpCode(200)
  @Get('/filters')
  async getWithFilters(@Query() query: SearchDto) {
    const form = SearchDto.from(query)
    const errors = await SearchDto.validate(form)
    if (errors) {
      throw new ApiRequestException(ErrorCodes.InvalidRequest, errors)
    }

    return await this.productService.getFiltered(query)
  }
}
