import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { OrderDetails } from 'src/models/order-details.model';

@Module({
  controllers: [ReportController],
  providers: [ReportService, OrderDetails]
})
export class ReportModule {}
