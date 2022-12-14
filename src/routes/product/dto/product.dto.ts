import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    productName:string;

    @IsNotEmpty()
    @IsNumber()
    productPrice:number;

    @IsNotEmpty()
    @IsNumber()
    productStock:number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumberString()
    categoryId: string;

    @IsNotEmpty()
    @IsNumberString()
    subcategoryId: string;

    @IsNotEmpty()
    @IsNumberString()
    setcategoryId: string;

    @IsOptional()
    @IsString()
    details: string;

    @IsNumberString()
    @IsOptional()
    productId: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsOptional()
    image_url: string;
    @IsOptional()
    image_id: string;
}

export class UpdateProduct {
    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsString()
    details: string;

    @IsString()
    @IsOptional()
    image_url: string;

    @IsString()
    @IsOptional()
    image_id:string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsNumber()
    @IsNotEmpty()
    subcategoryId: number;

    @IsNotEmpty()
    @IsNumber()
    setcategoryId: number;

    @IsNumber()
    @IsOptional()
    productId: number;
}