import { ROLE } from "@prisma/client";
import { IsNotEmpty, IsEmail, IsNumberString, IsOptional } from "class-validator"
import { Match } from "src/common/decorators";

export class addTocartDto {
    @IsNotEmpty()
    productId: number;

    @IsOptional()
    bundleVariants: {quantity: number, productId: number}[]
}
