import { ForbiddenException, NestMiddleware } from "@nestjs/common";
import { Product } from "src/models";

export class ValidateCheckoutMiddleware implements NestMiddleware {
    /**
     *
     */
    // constructor(private readonly productModel: Product) {}

    async use(req: any, res: any, next: (error?: any) => void) {
            const productModel = new Product()
            const checkout = req.body;
            const {cartProducts} = checkout;

            const cartProductsIds = cartProducts.map((cartProduct) => cartProduct.product.id);
            const products = await productModel.getProductsByArrayOfId(cartProductsIds);


            const isNotOutOfStock = products.every((product, index) => {
                for (let i = 0; i < cartProducts.length; i++) {
                  if (product.id === cartProducts[i].product.id) {
                    return cartProducts[i].quantity <= product.stock;
                  }
                }
              });

              if(!isNotOutOfStock) throw new ForbiddenException('Out of stock')

            next()
    }
}

