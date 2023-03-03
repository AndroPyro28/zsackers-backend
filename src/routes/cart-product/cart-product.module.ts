import { Module } from '@nestjs/common';
import { Product } from 'src/models';
import { CartProductVariants } from 'src/models/cart-product-variants.model';
import { CartProduct } from 'src/models/cart-product.model';
import { CartProductController } from './cart-product.controller';
import { CartProductService } from './cart-product.service';

@Module({
  controllers: [CartProductController],
  providers: [CartProductService, CartProduct, Product, CartProductVariants]
})
export class CartProductModule {}
