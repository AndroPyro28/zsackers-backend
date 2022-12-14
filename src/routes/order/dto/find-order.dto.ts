import { transactionType } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';


export class FindOrderAdmin {
    @IsOptional()
    search: string;
    @IsNotEmpty()
    order_status: string;
    @IsNotEmpty()
    transaction_type: transactionType
}