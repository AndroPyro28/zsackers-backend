import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @MinLength(3, {message: 'category must be atleast 3 characters'})
    category: string;
}
