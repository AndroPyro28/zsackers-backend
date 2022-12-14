import { Module } from '@nestjs/common';
import { CartProduct } from 'src/models/cart-product.model';
import { CartProductController } from './cart-product.controller';
import { CartProductService } from './cart-product.service';

@Module({
  controllers: [CartProductController],
  providers: [CartProductService, CartProduct]
})
export class CartProductModule {}
