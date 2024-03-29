import { Injectable } from '@nestjs/common';
import { orderStatus } from '@prisma/client';
import {
  CreateOrderDto,
  CreateOrderWalkinDto,
} from 'src/routes/order/dto/create-order.dto';
import { FindOrderAdmin } from 'src/routes/order/dto/find-order.dto';
import { CancelOrderDto } from 'src/routes/order/dto/update-order.dto';
import { order_Details } from './root.model';
import UserInteface from './user.model';
@Injectable()
export class OrderDetails {
  async createOrder(createOrder: CreateOrderDto, userId: number) {
    const { paymentType, address, contact, totalAmount, order_id } =
      createOrder;

    try {
      const newOrder = await order_Details.create({
        data: {
          paymentMethod: paymentType,
          order_id,
          contact,
          totalAmount: Number(totalAmount.toFixed(0)),
          address,
          userId,
        },
      });
      return newOrder;
    } catch (error) {
      console.error(error);
    }
  }

  async createOrderWalkin(createOrder: CreateOrderWalkinDto, userId: number) {
    try {
      const { totalAmount, order_id } = createOrder;
      const newOrder = await order_Details.create({
        data: {
          totalAmount: Math.trunc(totalAmount),
          order_id,
          transaction_type: 'WALK_IN',
          userId: userId,
          order_status: 'onGoing',
          delivery_status: 3,
        },
      });

      return newOrder;
    } catch (error) {
      console.error(error);
    }
  }

  async findAllByAdmin(queries: FindOrderAdmin) {
    const { search, transaction_type, order_status } = queries;
    try {
      let condition: any = {
        OR: [
          {
            order_id: {
              contains: search,
            },
            order_status: 'pending',
            transaction_type,
          },
          {
            order_id: {
              contains: search,
            },
            order_status: 'onGoing',
            transaction_type,
          },
        ],
      };
      if (order_status != 'all') {
        condition = {
          order_id: {
            contains: search,
          },
          order_status: order_status as orderStatus,
          transaction_type,
        };
      }
      const orders = await order_Details.findMany({
        where: condition,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return orders;
    } catch (error) {
      console.error(error);
    }
  }

  async findAllCompletedAndCancelledOrders(
    filterDateFrom: string,
    filterDateTo: string,
  ) {
    try {
      const orders = await order_Details.findMany({
        // where: {
        //   OR: [
        //     {
        //       // order_status: 'cancelled',
        //       createdAt: {
        //         gte:new Date(filterDateFrom + ''),
        //       }
        //     },
        //     {
        //       // order_status: 'cancelled',
        //       createdAt: {
        //         equals:new Date(filterDateFrom + ''),
        //       }
        //     },
        //     {
        //       // order_status: 'cancelled',
        //       createdAt: {
        //         equals:new Date(filterDateTo + ''),
        //       }
        //     },
        //     {
        //       // order_status: 'completed',
        //       createdAt: {
        //         gte:new Date(filterDateFrom + ''),
        //         lte: new Date(filterDateTo + '')
        //       }
        //     }
        //   ]
        //   // createdAt: {
        //     // gte: new Date(filterDateFrom + ''),
        //     // // equals: new Date(filterDateFrom + ''),
        //     // lte: new Date(filterDateTo + ''),
        //   // },
        // },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: true,
            },
          },
          cart_product: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const from = new Date(filterDateFrom)?.toISOString().slice(0, 10);
      const to = new Date(filterDateTo)?.toISOString().slice(0, 10);
      const filteredDate = orders.filter(
        (order) =>
          from <= new Date(order.createdAt)?.toISOString().slice(0, 10) &&
          to >= new Date(order.createdAt)?.toISOString().slice(0, 10),
      );
      return filteredDate;
    } catch (error) {
      console.error('errorrrr');
    }
  }

  async findAllByCustomer(status: string, userId: number) {
    try {
      let condition: object = {
        userId,
      };
      if (status === 'preparing') {
        condition = {
          OR: [
            {
              order_status: 'pending',
              delivery_status: 0,
              userId,
              user: {
                role: 'CUSTOMER',
              },
            },
            {
              order_status: 'onGoing',
              delivery_status: 1,
              userId,
              user: {
                role: 'CUSTOMER',
              },
            },
            {
              order_status: 'onGoing',
              delivery_status: 2,
              userId,
              user: {
                role: 'CUSTOMER',
              },
            },
          ],
        };
      }

      if (status === 'to-receive') {
        condition = {
          order_status: 'onGoing',
          delivery_status: 3,
          userId,
          user: {
            role: 'CUSTOMER',
          },
        };
      }

      if (status === 'completed') {
        condition = {
          order_status: 'completed',
          delivery_status: 4,
          userId,
          user: {
            role: 'CUSTOMER',
          },
        };
      }

      const orders = await order_Details.findMany({
        where: condition,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: true,
            },
          },
          cart_product: {
            select: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      // console.log(orders)
      return orders;
    } catch (error) {
      console.error(error);
    }
  }

  async findOneByOrderId(order_id: string) {
    console.log(order_id);
    try {
      const orderDetails = await order_Details.findUnique({
        where: {
          order_id,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: true,
            },
          },
          cart_product: {
            include: {
              product: true,
              Cart_Product_Variant: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
      return orderDetails;
    } catch (error) {
      console.error(error);
    }
  }

  async findOrderById(id: number) {
    try {
      const order = await order_Details.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: true,
            },
          },
          cart_product: {
            include: {
              Cart_Product_Variant: {
                include: {
                  product: true,
                },
              },
              product: true,
            },
          },
        },
      });
      return order;
    } catch (error) {
      console.error(error);
    }
  }

  async updateStatus(id: number, deliveryStatus: number) {
    try {
      let orderStatus: orderStatus;
      if (
        deliveryStatus + 1 === 1 ||
        deliveryStatus + 1 === 2 ||
        deliveryStatus + 1 === 3
      )
        orderStatus = 'onGoing';

      if (deliveryStatus + 1 === 4) orderStatus = 'completed';

      const updatedOrder = await order_Details.update({
        where: {
          id,
        },
        data: {
          order_status: orderStatus,
          delivery_status: {
            increment: 1,
          },
        },
      });
      return updatedOrder;
    } catch (error) {
      console.error(error);
    }
  }

  async cancelOrder(id: number, cancelOrderDto: CancelOrderDto) {
    try {
      const updatedOrder = await order_Details.update({
        where: { id },
        data: {
          delivery_status: -1,
          order_status: 'cancelled',
          cancel_reason: cancelOrderDto.reason,
        },
      });
      return updatedOrder;
    } catch (error) {
      console.error(error);
    }
  }

  async findAllOrders() {
    try {
      const orders = await order_Details.findMany();
      return orders;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllOrdersByWeekdays(weekdays: string[]) {
    try {
      const orders = await order_Details.findMany({
        where: {
          createdAt: {
            gte: new Date(weekdays[0]),
            lte: new Date(weekdays[weekdays.length - 1]),
          },
        },
        orderBy: {
          createdAt: 'asc'
        }
      });

      return orders;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllOrdersByYear() {
    try {
      const orders = await order_Details.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear().toString())
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      });
      return orders;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllOrdersByMonth() {
    try {
      const orders = await order_Details.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      });
      return orders;
    } catch (error) {
      console.error(error);
    }
  }
}
