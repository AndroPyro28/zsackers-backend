import { IsOptional } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends CreateOrderDto {}

export class CancelOrderDto {
    @IsOptional()
    reason: string
}