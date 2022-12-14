import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Min, MinLength } from "class-validator";

export class CreateSubcategoryDto {
    @IsNotEmpty()
    @MinLength(3, {message: 'subcategory must be atleast 3 characters'})
    subcategory: string;
    // @IsOptional()
    // @IsBoolean()
    // premium: boolean;
    @IsNotEmpty()
    @IsNumber()
    categoryId: number
}

export class UpdateSubCategoryDto {
    @IsNotEmpty()
    @MinLength(3, {message: 'subcategory must be atleast 3 characters'})
    subcategory: string;

    // @IsOptional()
    // @IsBoolean()
    // premium: boolean;
}
