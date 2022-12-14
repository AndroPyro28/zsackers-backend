import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { CartProductService } from './cart-product.service';
import { Roles } from 'src/common/decorators/roles.decorator';
@Controller('cart-products')
export class CartProductController {

    /**
     *
     */
    constructor(private readonly cartProduct: CartProductService) {}

    @Post()
    @Roles(['CUSTOMER', 'STAFF'])
    @HttpCode(HttpStatus.CREATED)
    async addToCart(
        @Body('productId', ParseIntPipe) productId: number,
        @GetCurrentUser('id') userId: number
    ) {
        return this.cartProduct.addToCart(productId, userId);
    }

    @Get()
    @Roles(['CUSTOMER', 'STAFF'])
    @HttpCode(HttpStatus.OK)
    async getCartProducts(@GetCurrentUser('id') userId: number) {
        return this.cartProduct.getCartProducts(userId);
    }

    @Patch(':id')
    @Roles(['CUSTOMER', 'STAFF'])
    @HttpCode(HttpStatus.OK)
    async updateCartQuantity(
            @GetCurrentUser('id', ParseIntPipe) userId: number,
            @Body('action') action: string,
            @Param('id', ParseIntPipe) cartProductId: number
        ) {
        return this.cartProduct.updateCartQuantity(cartProductId, userId, action);
    }

    @Delete(':id')
    @Roles(['CUSTOMER', 'STAFF'])
    @HttpCode(HttpStatus.OK)
    async deleteOneCartProduct(
        @Param('id', ParseIntPipe) cartProductId: number,
        @GetCurrentUser('id', ParseIntPipe) userId: number,
    ) {
        return this.cartProduct.deleteOneCartProduct(cartProductId);

    }

}
