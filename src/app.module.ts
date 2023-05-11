import { Module } from '@nestjs/common';
import { AuthModule, CategoryModule, SubcategoryModule, ProductModule } from './routes';
// import { SetcategoryModule } from './routes/setcategory/setcategory.module';
import { CartProductModule } from './routes/cart-product/cart-product.module';
import { StaffModule } from './routes/staff/staff.module';
import { OrderModule } from './routes/order/order.module';
import { UserModule } from './routes/user/user.module';
import { ReportModule } from './routes/report/report.module';
import { AdminModule } from './routes/admin/admin.module';
import { DeliveryModule } from './routes/delivery/delivery.module';

@Module({
  imports: [AuthModule, CategoryModule, SubcategoryModule, ProductModule, CartProductModule, StaffModule, OrderModule, UserModule, ReportModule, AdminModule, DeliveryModule],
})
export class AppModule {}

