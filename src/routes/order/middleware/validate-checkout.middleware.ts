import { ForbiddenException, NestMiddleware } from "@nestjs/common";
import { Product,CartProduct } from "src/models";

export class ValidateCheckoutMiddleware implements NestMiddleware {
    /**
     *
     */
    // constructor(private readonly productModel: Product) {}

    async use(req: any, res: any, next: (error?: any) => void) {
            const productModel = new Product()
            const cartProductModel = new CartProduct()
            const checkout = req.body;
            const {cartProducts} = checkout;

            const cartProductsIds = cartProducts.map((cartProduct) => cartProduct.id);
            const cartProductsList = await cartProductModel.findManyByIds(cartProductsIds);
            const arrayOfProductId = [];

            cartProductsList.forEach((cartProduct) => {
              if(cartProduct?.Cart_Product_Variant.length > 0) {
                  cartProduct.Cart_Product_Variant.forEach((cartProductVariant) => {
                    arrayOfProductId.push(cartProductVariant.productId)
                  })
              } 
              if(cartProduct.product.productType !== 'BUNDLE') {
                    arrayOfProductId.push(cartProduct.productId)
              }
            })

            const products = await productModel.getProductsByArrayOfId(arrayOfProductId);

            for(let i = 0; i < cartProductsList.length; i++) {
                if(cartProductsList[i].product.productType === 'SINGLE') {
                  const index = products.findIndex(product => product.id === cartProductsList[i].product.id);
                  if(products[index]?.stock - cartProductsList[i].quantity < 0) {
                    throw new ForbiddenException('Out of stock')
                  } else {
                    products[index].stock = products[index].stock - cartProductsList[i].quantity;
                  }
                }

                if(cartProductsList[i].Cart_Product_Variant.length > 0) {

                   cartProductsList[i].Cart_Product_Variant.forEach(variant => {
                    const index = products.findIndex(product => product.id === variant.product.id);
                    if(products[index]?.stock - variant.quantity * cartProductsList[i].quantity < 0) {
                    throw new ForbiddenException('Add ons is out of stock please decrease your product quantity')
                  } else {
                    console.log( 'last',  products[index]?.stock)
                      products[index].stock = products[index]?.stock - variant.quantity * cartProductsList[i].quantity
                    }
                  })
                }
            }
            next()
    }
}

