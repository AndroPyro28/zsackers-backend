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
import { totalmem } from 'os';
@Injectable()
export class OrderService {
  constructor(
    private readonly orderDetailsModel: OrderDetails,
    private readonly cartProductModel: CartProduct,
    private readonly productModel: Product,
    private readonly vonageApi: VonageApi
  ) {}
  
  async checkout(createOrderDto: CreateOrderDto,currentUser: UserInteface, res: Response) {
    const { paymentType, cartProducts, address, contact, totalAmount} = createOrderDto;
    const total_amount = Math.round(totalAmount * 0.1 + totalAmount)
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
        if (error) throw new Error(error);

        const { data } = JSON.parse(response.body);

        const { checkouturl, hash } = data;

        return res.json({ ...returnJson, checkouturl, order_id: hash });
      });
    }
    if (paymentType === 'cod') {
      return res.json({
        ...returnJson,
        checkouturl: `${process.env.CLIENT_URL}/customer/payment`,
        order_id: `${uuid()}`.replace(/\-/g,""),
      });
    }
  }
  
  async pos(createOrderDto: CreateOrderWalkinDto, userId: number) {
    const newOrderDetails = await this.orderDetailsModel.createOrderWalkin(createOrderDto, userId)

    const {cartProducts} = createOrderDto;
    const cartProductIds = cartProducts.map(cartProduct => cartProduct.id);

    const productIds = cartProducts.map(cartProduct => ({
      id: cartProduct.product.id,
      quantity: cartProduct.quantity
    }));

    const updateProducts = await this.productModel.updateProductsStocks(productIds)

    const updateCartProducts = await this.cartProductModel.updateManyCartProductsWithOrder(cartProductIds, newOrderDetails?.id)
    return {
      success: true
    }
  }
  
  async payment(createOrderDto: CreateOrderDto, userId: number) {
    const newOrderDetails = await this.orderDetailsModel.createOrder(createOrderDto, userId)
    const {cartProducts} = createOrderDto;
    const cartProductIds = cartProducts.map(cartProduct => cartProduct.id);

    const productIds = cartProducts.map(cartProduct => ({
      id: cartProduct.product.id,
      quantity: cartProduct.quantity
    }));
    const updateProducts = await this.productModel.updateProductsStocks(productIds)

    const updateCartProducts = await this.cartProductModel.updateManyCartProductsWithOrder(cartProductIds,newOrderDetails.id)
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
    const orders = await this.orderDetailsModel.findAllOrders();
    console.log(yearSelected);
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

    const totalSalesToday = orders?.reduce((total ,order) => {
      const orderDate = new Date(order.createdAt)?.toISOString().slice(0, 10);
      const todayDate = new Date()?.toISOString().slice(0, 10);

      if(orderDate  === todayDate ) {
        return total + order.totalAmount
      }

      return total;
    }, 0)

    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      const year = new Date(order.createdAt).getFullYear();
      if (year === yearSelected && order.order_status === 'cancelled') {
        monthlyCancelledTransactions[month].total++;
      }
    });

    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      const year = new Date(order.createdAt).getFullYear();
      if (year === yearSelected && order.order_status === 'completed') {
        monthlySuccessTransactions[month].total++;
      }
    });

    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      const year = new Date(order.createdAt).getFullYear();
      if (year === yearSelected) {
        monthlyTotalTransactions[month].total++;
      }
    });

    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      const year = new Date(order.createdAt).getFullYear();
      if (year === yearSelected && order?.order_status != 'cancelled') {
        monthlySales[month].total += order?.totalAmount;
      }
    });

    console.log({ 
      monthlyCancelledTransactions,
      monthlySuccessTransactions,
      monthlyTotalTransactions,
      monthlySales,
      totalSalesToday 
    })

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

    const message = `Good day ${order.user.profile.firstname} ${order.user.profile.lastname},

    Your order has been cancelled, reason: ${cancelOrderDto.reason}

    -Zsakers cafe
    `
    if(order.transaction_type === 'ONLINE') {
      this.vonageApi.sendSms(order.contact, message)
    }
    const cancelOrder = await this.orderDetailsModel.cancelOrder(id, cancelOrderDto);

    if(!cancelOrder) throw new ForbiddenException('Didnt update status');
    return cancelOrder
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
