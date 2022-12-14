import { ForbiddenException, Injectable } from '@nestjs/common';
import { CartProduct } from 'src/models';

@Injectable()
export class CartProductService {

    /**
     *
     */
    constructor(private readonly cartProductModel: CartProduct) {
    }

    async addToCart(productId: number, userId: number) {
        const result = await this.cartProductModel.addToCart(productId, userId);

        if(!result) throw new ForbiddenException('Something went wrong...')

        return result;
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
