import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "src/routes/category/dto";
import { category } from "./root.model";

@Injectable()

export class Category {

    async createCategory(body:CreateCategoryDto) {
        try {
            const newCategory = await category.create({
                data: {
                    name: body.category
                }
            })
            return newCategory;
        } catch (error) {
            console.error(error)
        }
    }

    async getAllCategories(search:string) {
        try {
            const categories = await category.findMany({
                where: {
                    name: {
                        contains: search
                    },
                },
                include: {
                    sub_category: {
                        include: {
                            set_category: true
                        },
                        orderBy: [{
                            createdAt: 'desc'
                        }],
                    },
                },
                orderBy: [{
                    createdAt: 'desc'
                }]
            })
            return categories;
        } catch (error) {
            console.error(error)
        }
    }

    async updateCategory(id: number, categoryData: string) {
        try {
            const updatedCategory = await category.update({
                where: {
                    id
                },
                data: {
                    name: categoryData
                }
            })
            return updatedCategory;
        } catch (error) {
            console.error(error)
        }
    }

    async deleteCategory(id: number) {
        try {
            const deletedCategory = await category.delete({
                where: {
                    id
                }
            })
            return deletedCategory;
        } catch (error) {
            console.error(error)
        }
    }
}