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


    const separatedData = weeklySales.reduce((acc, order) => {
      const date = new Date(order.createdAt)?.toISOString().slice(0, 10);
      
      if (!acc[date]) {

        if(order.order_status === 'cancelled') {
          acc[date] = {
            totalSales: 0,
            totalCancelled: 1,
            totalTransaction: 1,
            totalSuccess: 0
          };
        } else {
          acc[date] = {
            totalSales: order.totalAmount,
            totalCancelled: 0,
            totalTransaction: 1,
            totalSuccess: 1
          };
        }

        if(order.transaction_type === 'ONLINE') {
          acc[date] = {
            ...acc[date],
            onlineTransaction: 1,
            walkinTransaction: 0
          };
        } else{
          acc[date] = {
            ...acc[date],
            onlineTransaction: 0,
            walkinTransaction: 1
          };
        } 
        
      }

      else {
        if(order.order_status === 'cancelled') {
          acc[date] = {
            ...acc[date],
            totalTransaction: acc[date].totalTransaction + 1,
            totalCancelled: acc[date].totalCancelled + 1
          };
        } else {
          acc[date] = {
            ...acc[date],
            totalSales: acc[date].totalSales + order.totalAmount,
            totalTransaction: acc[date].totalTransaction + 1,
            totalSuccess: acc[date].totalSuccess + 1
          };
        }

        if(order.transaction_type === 'ONLINE') {
          acc[date] = {
            ...acc[date],
            onlineTransaction: acc[date].onlineTransaction + 1,
          };
        } else{
          acc[date] = {
            ...acc[date],
            walkinTransaction: acc[date].walkinTransaction + 1,
          };
        } 
      }
      return acc;
    }, {});
    return separatedData;
  }

 
  async generateReportByYear() {

    const monthly = [
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 0
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 1
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 2
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 3
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 4
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 5
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 6
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 7
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 8
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 9
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 10
      },
      {
        totalTransaction: 0,
        totalCancelled: 0,
        totalSuccess: 0,
        totalSales: 0,
        onlineTransaction: 0,
        walkinTransaction: 0,
        month: 11
      }
    ]

    const allOrders = await this.orderDetailsModel.getAllOrdersByYear();

    allOrders.forEach((order) => {
      if(order.order_status === 'cancelled') {
        monthly[order.createdAt.getMonth()].totalCancelled += 1
        monthly[order.createdAt.getMonth()].totalTransaction += 1
      } else {
        monthly[order.createdAt.getMonth()].totalSales += order.totalAmount
        monthly[order.createdAt.getMonth()].totalTransaction += 1
        monthly[order.createdAt.getMonth()].totalSuccess += 1
      }

      if(order.transaction_type === 'ONLINE') {
        monthly[order.createdAt.getMonth()].onlineTransaction += 1
      } else {
        monthly[order.createdAt.getMonth()].walkinTransaction += 1
      }
    })

    return monthly
  }


  async generateReportByMonth () {
    const orders = await this.orderDetailsModel.getAllOrdersByMonth();

    const thisMonth = {
      totalTransaction: 0,
      totalCancelled: 0,
      totalSuccess: 0,
      totalSales: 0,
      onlineTransaction: 0,
      walkinTransaction: 0,
    }

    orders.forEach((order) => {
      if(order.order_status === 'cancelled') {
        thisMonth.totalCancelled += 1
        thisMonth.totalTransaction += 1
      } else {
        thisMonth.totalSales += order.totalAmount
        thisMonth.totalTransaction += 1
        thisMonth.totalSuccess += 1
      }

      if(order.transaction_type === 'ONLINE') {
        thisMonth.onlineTransaction += 1
      } else {
        thisMonth.walkinTransaction += 1
      }
    })
    return thisMonth
  }

}
