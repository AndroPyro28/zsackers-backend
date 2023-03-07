import { ROLE } from "@prisma/client";
import { IsNotEmpty, IsEmail, IsNumberString, IsOptional, Matches as RegexMatches } from "class-validator"
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

export class confirmResetCodeDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    code: string
}

export class UpdatePasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @Match('password', {
        message: 'password and password confirmation do not match'
    })
    confirmPassword: string;
}

export class ChangePasswordDto {
    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    @RegexMatches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
        message: 'Must contain 8 Characters, one uppercase, one lowercase, one number and one special case character'
    })
    newPassword: string;

    @IsNotEmpty()
    @Match('newPassword', {
        message: 'New password and password confirmation do not match'
    })
    confirmPassword: string;
}