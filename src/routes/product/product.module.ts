import { Module } from '@nestjs/common';
import { Cloudinary } from 'src/common/utils/cloudinary.utils';
import { Bundles } from 'src/models';
import { Product } from 'src/models/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, Cloudinary, Product, Bundles],
  exports: [Product]
})
export class ProductModule {}
