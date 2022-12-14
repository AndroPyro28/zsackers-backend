import { Product } from "@prisma/client";
import { Type } from "class-transformer";
import {ArrayMinSize, IsArray, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsOptional, IsString, ValidateNested} from 'class-validator'
class CartProducts {
    @IsNotEmpty()
    product: Product;
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    quantity: number;
}


export class CreateOrderDto {
    @IsNotEmpty()
    address: string;
    
    @IsNotEmpty()
    @IsNumberString()
    contact: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => CartProducts)

    cartProducts: CartProducts[]

    @IsNotEmpty()
    @IsString()
    paymentType: string;

    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;
    
    @IsOptional()
    order_id: string;
}

export class CreateOrderWalkinDto {

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => CartProducts)
    cartProducts: CartProducts[]

    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;
    
    @IsOptional()
    order_id: string;
}
