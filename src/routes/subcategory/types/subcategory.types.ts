import { IsNotEmpty, MinLength } from "class-validator";

export interface SubCategory {
    id: number;
    name: string;
    price: bigint;
    premium: boolean;
    createdAt: string;
    updatedAt: string;
}
