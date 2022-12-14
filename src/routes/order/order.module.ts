import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ValidateCheckoutMiddleware } from './middleware';
import { CartProduct, Product } from 'src/models';
import { OrderDetails } from 'src/models/order-details.model';
import { VonageApi } from 'src/common/utils/vonage.utils';

@Module({
  controllers: [OrderController],
  providers: [OrderService, Product, OrderDetails, CartProduct, VonageApi]
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateCheckoutMiddleware)
    .forRoutes(
      {
        path: 'order/checkout',
        method: RequestMethod.POST
      },
      {
        path: 'order/payment',
        method: RequestMethod.POST
      }
    )
  }
}
