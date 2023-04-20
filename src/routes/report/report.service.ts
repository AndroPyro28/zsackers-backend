import { Injectable } from '@nestjs/common';
import { OrderDetails } from 'src/models/order-details.model';

@Injectable()
export class ReportService {

  /**
   *
   */
  constructor(private readonly orderDetailsModel: OrderDetails) {}

  
  async generateReportByWeek() {
    const currentDate = new Date();

    // Calculate the start and end dates of the current week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const weekdays: string[] = []
    // Loop through the dates of the current week and print them
    for (
      let date = startOfWeek;
      date <= endOfWeek;
      date.setDate(date.getDate() + 1)
    ) {
      weekdays.push(new Date(date.toLocaleDateString())?.toISOString().slice(0, 10));
    }
    const weeklySales = await this.orderDetailsModel.getAllOrdersByWeekdays(weekdays)

    // weeklySales.reduce((weekdays, order) => {
    //   const date = new Date(orders.createdAt)?.toISOString().slice(0, 10)
    //   if( orders.order_status === 'completed') {
    //     // weekdays[date].totalSales > 0 ? weekdays[date].totalSales.

    //   weekdays[date]?.totalSales = !weekdays[date]?.totalSales ? order.totalAmount : 

    //   }
    // }, [])

    const separatedData = weeklySales.reduce((acc, order) => {
      const date = new Date(order.createdAt)?.toISOString().slice(0, 10);
      
      if (!acc[date]) {
        console.log('!acc')
        if(order.order_status === 'completed' || order.order_status === 'pending' || order.order_status === 'onGoing') {
          acc[date] = {
            totalSales: order.totalAmount,
            totalCancelled: 0,
            totalTransaction: 1,
            totalSuccess: 1
          };
        }

        if(order.order_status === 'cancelled') {
          acc[date] = {
            totalSales: 0,
            totalCancelled: 1,
            totalTransaction: 1,
            totalSuccess: 0
          };
        }
      }

      else {
        if(order.order_status === 'completed' || order.order_status === 'pending' || order.order_status === 'onGoing') {
          acc[date] = {
            ...acc[date],
            totalSales: acc[date].totalSales + order.totalAmount,
            totalTransaction: acc[date].totalTransaction + 1,
            totalSuccess: acc[date].totalSuccess + 1
          };
        }

        if(order.order_status === 'cancelled') {
          acc[date] = {
            ...acc[date],
            totalTransaction: acc[date].totalTransaction + 1,
            totalCancelled: acc[date].totalCancelled + 1
          };
        }
      }
      return acc;
    }, {});
    // console.log(separatedData)
    return separatedData;
  }
}
