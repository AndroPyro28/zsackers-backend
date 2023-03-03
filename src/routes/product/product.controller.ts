import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public, Roles } from 'src/common/decorators';
import { CreateProductDto, UpdateProduct } from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  /**
   *
   */
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(['ADMIN'])
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Get()
  // @Roles(['ADMIN', 'STAFF', 'CUSTOMER'])
  @Public()
  @HttpCode(HttpStatus.OK)
  async getAllProducts(
    @Query('name') productName: string,
    @Query('categoryId', ParseIntPipe) categoryId: number,
    @Query('subcategoryId', ParseIntPipe) subcategoryId: number,
    @Query('setcategoryId', ParseIntPipe) setcategoryId: number,
  ) {
    return this.productService.getAllProducts({
      productName,
      categoryId,
      subcategoryId,
      setcategoryId
    });
  }

  @Get(':id')
  @Roles(['ADMIN', 'STAFF', 'CUSTOMER'])
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id', ParseIntPipe) id: number){
    return this.productService.getProductById(id);
  }

  @Put(':id')
  @Roles(['ADMIN'])
  @HttpCode(HttpStatus.OK)
  async archiveProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.archiveProductById(id);
  }

  @Patch(':id')
  @Roles(['ADMIN'])
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProduct
  ) {
     return this.productService.updateProduct(id, body);
  }
}


