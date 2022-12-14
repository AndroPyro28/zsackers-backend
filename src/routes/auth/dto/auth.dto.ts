import { ROLE } from "@prisma/client";
import { IsNotEmpty, IsEmail, IsNumberString, IsOptional } from "class-validator"
import { Match } from "src/common/decorators";

export class SignupDto {
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @Match('password', {
        message: 'password and password confirmation do not match'
    })
    confirmPassword: string;

    @IsNotEmpty()
    @IsNumberString()
    contact:string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    role: ROLE;
}



export class SigninDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}