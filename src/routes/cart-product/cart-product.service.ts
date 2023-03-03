import { ForbiddenException, Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { CartProduct, Product } from 'src/models';
import { CartProductVariants } from 'src/models/cart-product-variants.model';
import { addTocartDto } from './dto';

@Injectable()
export class CartProductService {

    /**
     *
     */
    constructor(
        private readonly cartProductModel: CartProduct,
        private readonly productModel: Product,
        private readonly cartProductVariantsModel: CartProductVariants
        ) {
    }

    async addToCart(body: addTocartDto, userId: number) {

        const product = await this.productModel.getProductById(body.productId);
        const newCartProduct = await this.cartProductModel.addToCart(body.productId, userId);

        if(product.productType === 'BUNDLE') {
            this.cartProductVariantsModel.createVariants(newCartProduct.id, body.bundleVariants)
        }

        if(!newCartProduct) throw new ForbiddenException('Something went wrong...')

        return newCartProduct;
    }

    async getCartProducts (userId: number) {
        const result = await this.cartProductModel.getCartProductByUserId(userId);
        return result;
    }

    async updateCartQuantity(cartProductId: number, userId: number, action: string) {
        const result = await this.cartProductModel.updateCartQuantity(cartProductId, userId, action);
        if(!result) throw new ForbiddenException('Something went wrong...')
        return result;
    }
 
    async deleteOneCartProduct(cartProductId: number) {
        const result = await this.cartProductModel.deleteOneCartProduct(cartProductId);
    }
}
