import { Injectable } from "@nestjs/common";
import { CreateSubcategoryDto, UpdateSubCategoryDto } from "src/routes/subcategory/dto";
import { sub_Category } from "./root.model";
@Injectable()

export class Subcategory {

    async createSubcategory(body:CreateSubcategoryDto) {
        try {
            const newSubcategory = await sub_Category.create({
                data: {
                    name: body.subcategory,
                    categoryId: body.categoryId
                }
            })
            return newSubcategory;
        } catch (error) {
            console.error(error)
        }
    }

    async getAllSubcategories() {
        try {
            const subCategories = await sub_Category.findMany()
            return subCategories;
        } catch (error) {
            console.error(error)
        }
    }

    async updateSubcategories(id: number, body: UpdateSubCategoryDto) {
        try {
            const updatedSubCategory = await sub_Category.update({
                where: {
                    id
                },
                data: {
                    name: body.subcategory,
                }
            })
            return updatedSubCategory;
        } catch (error) {
            console.error(error)
        }
    }

    async deleteCategory(id: number) {
        try {
            const deletedSubCategory = await sub_Category.delete({
                where: {
                    id
                }
            })
            return deletedSubCategory;
        } catch (error) {
            console.error(error)
        }
    }
}