import { Injectable } from '@nestjs/common';
import { cart_Product_Variant } from './root.model';
type bundleVariants = {quantity: number, productId: number}[]

@Injectable()
export class CartProductVariants {
    
    async createVariants(cartProductId: number, bundleVariants: bundleVariants) {
        try {
            const createManyData = bundleVariants.map((bundles) => {
                if(bundles.quantity > 0) {
                    return {
                        productId: bundles.productId,
                        quantity: bundles.quantity,
                        cart_product_id: cartProductId
                    }
                }
            })
            const result = await cart_Product_Variant.createMany({
                data: createManyData
            })
            return result
        } catch (error) {
            console.error(error)
        }
    }

    async findVariants(cartProductIds: number[]) {
        try {
            const variants = await cart_Product_Variant.findMany({
                where: {
                    cart_product_id: {
                        in: cartProductIds
                    }
                }
            })
            return variants;
        } catch (error) {
         console.error(error)   
        }
    }
}
