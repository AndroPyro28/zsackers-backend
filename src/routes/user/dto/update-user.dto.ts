import { IsNotEmpty, IsNumberString } from "class-validator"

export class UpdateUserDto  {
    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    @IsNumberString()
    contact: string
}

