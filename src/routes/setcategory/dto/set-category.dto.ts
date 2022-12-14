import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, MinLength } from "class-validator";

export class CreateSetCategoryDto {
    @IsNotEmpty()
    @MinLength(3, {message: 'Setcategory must be atleast 3 characters'})
    setcategory: string;
    @IsBoolean()
    @IsOptional()
    premium: Boolean;
    @IsNotEmpty()
    @IsNumber()
    subcategoryId: number
}

export class UpdateSetCategoryDto {
    @IsNotEmpty()
    @MinLength(3, {message: 'Setcategory must be atleast 3 characters'})
    setcategory: string;
    @IsBoolean()
    @IsOptional()
    premium: Boolean;
   
}