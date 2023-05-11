import { ROLE } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";



export class CreateDeliveryDto {

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsNumberString()
    contact:string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    role: ROLE;
}
