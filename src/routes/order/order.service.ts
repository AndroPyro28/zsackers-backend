import { ForbiddenException, Injectable } from '@nestjs/common';
import { CartProduct, Product } from 'src/models';
import { CreateOrderDto, CreateOrderWalkinDto } from './dto/create-order.dto';
import { CancelOrderDto, UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import UserInteface from 'src/models/user.model';
import { OrderDetails } from 'src/models/order-details.model';
import { orderStatus } from '@prisma/client';
import { VonageApi } from 'src/common/utils/vonage.utils';
import { FindOrderAdmin } from './dto/find-order.dto';
import { CartProductVariants } from 'src/models/cart-product-variants.model';
@Injectable()
export class OrderService {
  constructor(
    private readonly orderDetailsModel: OrderDetails,
    private readonly cartProductModel: CartProduct,
    private readonly productModel: Product,
    private readonly vonageApi: VonageApi,
    private readonly cartProductVariantsModel: CartProductVariants
  ) {}
  
  async checkout(createOrderDto: CreateOrderDto,currentUser: UserInteface, res: Response) {
    const { paymentType, cartProducts, address, contact, totalAmount} = createOrderDto;
    const total_amount = Math.round(40 + totalAmount)
    const returnJson: any = {
      proceedPayment: true,
      paymentType,
      cartProducts,
      totalAmount:total_amount,
      checkouturl: '',
      address,
      contact,
      order_id: '',
    };

    if (paymentType === 'gcash') {
      const request = require('request');
      var options = {
        method: 'POST',
        url: 'https://g.payx.ph/payment_request',
        formData: {
          'x-public-key': process.env.GCASH_API_KEY,
          amount: `${total_amount}`,
          description: 'Payment for services rendered',
          redirectsuccessurl: `${process.env.CLIENT_URL}/customer/payment`,
          // redirectfailurl: `${process.env.CLIENT_URL_PROD}/customer/cart`,
          customeremail: `${currentUser?.email}`,
          customermobile: `${currentUser?.profile.contact}`,
          customername: `${currentUser?.profile.firstname} ${currentUser?.profile.lastname}`,
          // webhooksuccessurl:`${process.env.SERVER_URI_PROD}/api/customer/paymentsuccess`
        },
      };
      request(options, function (error, response) {
        const payload = JSON.parse(response.body);

        const { data, error: errorMessage } = payload;

         if (errorMessage) return res.json({ message: 'Payment Method is unavailable', error: true });

          const { checkouturl, hash } = data;

        return res.json({ ...returnJson, checkouturl, order_id: hash });
      });
    }
    if (paymentType === 'cod') {

      const hashId = `${uuid()}`.replace(/\-/g,"").replace(/\D+/g, '');

      
      return res.json({
        ...returnJson,
        checkouturl: `${process.env.CLIENT_URL}/customer/payment`,
        order_id: hashId.substring(0, 5) ,
      });
    }
  }
  
  async pos(createOrderDto: CreateOrderWalkinDto, userId: number) {
    const newOrderDetails = await this.orderDetailsModel.createOrderWalkin(createOrderDto, userId)

    // const {cartProducts} = createOrderDto;
    // const cartProductIds = cartProducts.map(cartProduct => cartProduct.id);

    // const productIds = cartProducts.map(cartProduct => ({
    //   id: cartProduct.product.id,
    //   quantity: cartProduct.quantity,
    //   parentQuantity: 1
    // }));

    const {cartProducts} = createOrderDto;
    const cartProductIds = cartProducts.map(cartProduct => cartProduct.id);

    const bundleVariants = await this.cartProductVariantsModel.findVariants(cartProductIds);
    const productIds1 = cartProducts.map(cartProduct => ({
      id: cartProduct.product.id,
      quantity: cartProduct.quantity,
      parentQuantity: 1
    }));

    const productIds2 = bundleVariants.map((bundleVariant) => {
      const findParentCartProduct = cartProducts.find(cartProduct => cartProduct.id === bundleVariant.cart_product_id)
      return {
        id: bundleVariant.productId,
        quantity: bundleVariant.quantity,
        parentQuantity: findParentCartProduct.quantity
      }
    })
    const productIdsToUpdate = [...productIds1, ...productIds2]

    await this.productModel.updateProductsStocks(productIdsToUpdate)

    await this.cartProductModel.updateManyCartProductsWithOrder(cartProductIds, newOrderDetails?.id)
    return {
      success: true
    }
  }
  
  async payment(createOrderDto: CreateOrderDto, userId: number) {
    const newOrderDetails = await this.orderDetailsModel.createOrder(createOrderDto, userId)
    const {cartProducts} = createOrderDto;
    const cartProductIds = cartProducts.map(cartProduct => cartProduct.id);
    const bundleVariants = await this.cartProductVariantsModel.findVariants(cartProductIds);
    const productIds1 = cartProducts.map(cartProduct => ({
      id: cartProduct.product.id,
      quantity: cartProduct.quantity,
      parentQuantity: 1
    }));

    const productIds2 = bundleVariants.map((bundleVariant) => {
      const findParentCartProduct = cartProducts.find(cartProduct => cartProduct.id === bundleVariant.cart_product_id)
      
      if(bundleVariant.product.productType === 'ADDONS') {
        return {
          id: bundleVariant.productId,
          quantity: 1,
          parentQuantity: findParentCartProduct.quantity
        }
      }

      return {
        id: bundleVariant.productId,
        quantity: bundleVariant.quantity,
        parentQuantity: 1
      }
      
    })
    const productIdsToUpdate = [...productIds1, ...productIds2]

    await this.productModel.updateProductsStocks(productIdsToUpdate)
    await this.cartProductModel.updateManyCartProductsWithOrder(cartProductIds,newOrderDetails.id)
    return {
      success: true
    }
  }

  findAllByAdmin(queries: FindOrderAdmin) {
    return this.orderDetailsModel.findAllByAdmin(queries);
  }

  findAllByCustomer(status: string, userId: number ) {
    return this.orderDetailsModel.findAllByCustomer(status, userId);
  }

  findAllCompletedAndCancelledOrders(
    filterDateFrom: string,
    filterDateTo: string,
  ) {
    return this.orderDetailsModel.findAllCompletedAndCancelledOrders(filterDateFrom,
      filterDateTo);

  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async summary( yearSelected: number ) {
    const orders = await this.orderDetailsModel.getAllOrdersByYear();
    const monthlyCancelledTransactions = [
      {
        month: 0,
        total: 0
      },
      {
        month: 1,
        total: 0
      },
      {
        month: 2,
        total: 0
      },
      {
        month: 3,
        total: 0
      },
      {
        month: 4,
        total: 0
      },
      {
        month: 5,
        total: 0
      },
      {
        month: 6,
        total: 0
      },
      {
        month: 7,
        total: 0
      },
      {
        month: 8,
        total: 0
      },
      {
        month: 9,
        total: 0
      },
      {
        month: 10,
        total: 0
      },
      {
        month: 11,
        total: 0
      },
    ]

    const monthlySuccessTransactions = [
      {
        month: 0,
        total: 0
      },
      {
        month: 1,
        total: 0
      },
      {
        month: 2,
        total: 0
      },
      {
        month: 3,
        total: 0
      },
      {
        month: 4,
        total: 0
      },
      {
        month: 5,
        total: 0
      },
      {
        month: 6,
        total: 0
      },
      {
        month: 7,
        total: 0
      },
      {
        month: 8,
        total: 0
      },
      {
        month: 9,
        total: 0
      },
      {
        month: 10,
        total: 0
      },
      {
        month: 11,
        total: 0
      },
    ]

    const monthlyTotalTransactions = [
      {
        month: 0,
        total: 0
      },
      {
        month: 1,
        total: 0
      },
      {
        month: 2,
        total: 0
      },
      {
        month: 3,
        total: 0
      },
      {
        month: 4,
        total: 0
      },
      {
        month: 5,
        total: 0
      },
      {
        month: 6,
        total: 0
      },
      {
        month: 7,
        total: 0
      },
      {
        month: 8,
        total: 0
      },
      {
        month: 9,
        total: 0
      },
      {
        month: 10,
        total: 0
      },
      {
        month: 11,
        total: 0
      },
    ]

    const monthlySales = [
      {
        month: 0,
        total: 0
      },
      {
        month: 1,
        total: 0
      },
      {
        month: 2,
        total: 0
      },
      {
        month: 3,
        total: 0
      },
      {
        month: 4,
        total: 0
      },
      {
        month: 5,
        total: 0
      },
      {
        month: 6,
        total: 0
      },
      {
        month: 7,
        total: 0
      },
      {
        month: 8,
        total: 0
      },
      {
        month: 9,
        total: 0
      },
      {
        month: 10,
        total: 0
      },
      {
        month: 11,
        total: 0
      },
    ]

    const yearNow = new Date().getFullYear();

    // const totalSalesToday = orders?.reduce((total ,order) => {
    //   const orderDate = new Date(order.createdAt)?.toISOString().slice(0, 10);
    //   const todayDate = new Date()?.toISOString().slice(0, 10);

    //   if(orderDate  === todayDate && order.order_status !== 'cancelled') {
    //     return total + order.totalAmount
    //   }

    //   return total;
    // }, 0)
    let totalSalesToday = 0
    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      const year = new Date(order.createdAt).getFullYear();
      if (year === yearSelected && order.order_status === 'cancelled') {
        monthlyCancelledTransactions[month].total++;
        monthlyTotalTransactions[month].total++;
      } else {
        const orderDate = new Date(order.createdAt)?.toISOString().slice(0, 10);
        const todayDate = new Date()?.toISOString().slice(0, 10);

        if(orderDate  === todayDate) {
          totalSalesToday += order.totalAmount
        }

        monthlySuccessTransactions[month].total++;
        monthlyTotalTransactions[month].total++;
        monthlySales[month].total += order?.totalAmount;
        
      }
    });

    // orders.forEach((order) => {
    //   const month = new Date(order.createdAt).getMonth();
    //   const year = new Date(order.createdAt).getFullYear();
    //   if (year === yearSelected && order.order_status === 'completed') {
        
    //   }
    // });

    // orders.forEach((order) => {
    //   const month = new Date(order.createdAt).getMonth();
    //   const year = new Date(order.createdAt).getFullYear();
    //   if (year === yearSelected) {
    //   }
    // });

    // orders.forEach((order) => {
    //   const month = new Date(order.createdAt).getMonth();
    //   const year = new Date(order.createdAt).getFullYear();
    //   if (year === yearSelected && order?.order_status != 'cancelled') {
    //     monthlySales[month].total += order?.totalAmount;
    //   }
    // });


    return {
      monthlyCancelledTransactions,
      monthlySuccessTransactions,
      monthlyTotalTransactions,
      monthlySales,
      totalSalesToday
    }
  }

  

  async findOneByOrderId (order_id: string) {
    const orderDetails = await this.orderDetailsModel.findOneByOrderId(order_id);
    if(!orderDetails) {
      throw new ForbiddenException('Cannot find order details')
    }

    return orderDetails
  }

 async updateStatus(id: number, deliveryStatus: number) {

  const order = await this.orderDetailsModel.findOrderById(id);
  let message: string;

  if(deliveryStatus+1 === 1) {
    message = `Good day ${order.user.profile.firstname} ${order.user.profile.lastname},
    
    Your order in transaction: ${order.order_id} in Zsackers Cafe is now being prepared

    -Zsakers cafe

    `
  }

  if(deliveryStatus+1 === 2) {
    message = `Good day ${order.user.profile.firstname} ${order.user.profile.lastname},
         
      Your order is done packing and ready to dispatch.

      -Zsakers cafe
`
  }

  if(deliveryStatus+1 === 3) {
    message = `Good day ${order.user.profile.firstname} ${order.user.profile.lastname},
        
    Your order is in shipping process.

    -Zsakers cafe
    `
  }

  if(deliveryStatus+1 === 4) {
    message = `Good day ${order.user.profile.firstname} ${order.user.profile.lastname},
    Your order is completed, thank you for ordering our product enjoy!
    
    -Zsakers cafe
    `
  }

    if(order.transaction_type === 'ONLINE') {
      this.vonageApi.sendSms(order.contact, message)
    }
 
    const updatedOrder = await this.orderDetailsModel.updateStatus(id, deliveryStatus);

    if(!updatedOrder) throw new ForbiddenException('Didnt update status');
    return updatedOrder
  }

  async cancelOrder(id: number, cancelOrderDto: CancelOrderDto) {
    const order = await this.orderDetailsModel.findOrderById(id);

    const productToRetrieve: {id: number, stock: number}[] = []
    order?.cart_product.forEach((cartProduct) => {
      if(cartProduct.product.productType === 'BUNDLE') {
        cartProduct.Cart_Product_Variant.forEach((cartProductVariant) => {
          productToRetrieve.push({
            id: cartProductVariant.productId,
            stock: cartProductVariant.quantity
          })
        })
      } else {
        productToRetrieve.push({
          id: cartProduct.productId,
          stock: cartProduct.product.quantity
        })
      }
    })

    this.productModel.retrieveCancelledProductsStocks(productToRetrieve)
    if( order.transaction_type === 'ONLINE' && order?.delivery_status < 2  ) {

      const message = `Good day ${order.user.profile.firstname} ${order.user.profile.lastname},

    Your order has been cancelled, reason: ${cancelOrderDto.reason}

    -Zsakers cafe
    `
      this.vonageApi.sendSms(order.contact, message)

      const cancelOrder = await this.orderDetailsModel.cancelOrder(id, cancelOrderDto);

      if(!cancelOrder) throw new ForbiddenException('Order didnt cancelled');
      return cancelOrder
    } else {
      const cancelOrder = await this.orderDetailsModel.cancelOrder(id, cancelOrderDto);
      return cancelOrder
    }  
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
