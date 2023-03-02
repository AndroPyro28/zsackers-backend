import { Injectable } from '@nestjs/common';
import { cart_Product, product } from './root.model';

@Injectable()
export class CartProduct {
  async getCartProductByUserId(userId: number) {
    try {
      const cartProducts = await cart_Product.findMany({
        where: {
          userId,
          isArchive: false
        },
        select: {
          id: true,
          quantity: true,
          product: true,
        },
      });

      return cartProducts;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductCartById(cartProductId: number) {
    try {
      const product = await cart_Product.findFirst({
        where: {
          id: cartProductId,
        },
        include: {
          product: true,
        },
      });
      return product;
    } catch (error) {
      console.error(error);
    }
  }

  async updateManyCartProductsWithOrder(cartProductsIds: number[], orderId: number) {
    try {
      const update = await cart_Product.updateMany({
        where: {
          id: {
            in: cartProductsIds
          }
        },
        data: {
          orderId,
          isArchive: true
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  async addToCart(productId: number, userId: number) {
    try {
      const isAlreadyInCart = await cart_Product.findFirst({
        where: {
          productId,
          isArchive: false,
          userId,
        },
      });
      if (!Boolean(isAlreadyInCart)) {
        const addToCart = await cart_Product.create({
          data: {
            productId,
            userId,
          },
        });
        return addToCart;
      }

      const incremeantProductOnCart = await cart_Product.update({
        where: {
          id: isAlreadyInCart.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return incremeantProductOnCart;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteOneCartProduct(cartProductId: number) {
    try {
      const deletedProduct = await cart_Product.delete({
        where: {
          id: cartProductId,
        },
      });

      return deletedProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async updateCartQuantity(cartProductId: number, userId: number, action: string) {
    try {
      const cartProduct = await this.getProductCartById(cartProductId);
      if (action === 'decrement') {
        return cartProduct.quantity - 1 <= 0
          ? await this.deleteOneCartProduct(cartProductId)
          : await cart_Product.updateMany({
              where: {
                id: cartProductId,
                userId,
              },
              data: {
                quantity: {
                  decrement: 1,
                },
              },
            });
      }

      if (action === 'increment') {
        return cartProduct.quantity + 1 > cartProduct.product.stock
          ? new Error('Cannot exceed to product stock')
          : await cart_Product.updateMany({
              where: {
                id: cartProductId,
                userId,
              },
              data: {
                quantity: {
                  increment: 1,
                },
              },
            });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
