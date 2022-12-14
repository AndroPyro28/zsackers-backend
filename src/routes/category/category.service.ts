import { ForbiddenException, Injectable } from '@nestjs/common';
import { Category } from 'src/models';
import { CreateCategoryDto } from './dto';
import {Category as CategoryInterface} from "@prisma/client"

@Injectable()
export class CategoryService {
    /**
     *
     */
    constructor(private readonly categoryModel: Category) {}

    async createCategory(body: CreateCategoryDto){
        const newCategory = await this.categoryModel.createCategory(body)

        if(!newCategory) throw new ForbiddenException('Category already exist');

        return newCategory
    }

    async getAllCategories(search: string): Promise<CategoryInterface[]> {
        const categories = await this.categoryModel.getAllCategories(search)
        return categories
    }

    async updateCategory(id: number, category: string) {
        const updatedCategory = await this.categoryModel.updateCategory(id, category)
        if(!updatedCategory) throw new ForbiddenException('Error Occured maybe this category is already taken')
        return updatedCategory
    }

    async deleteCategory(id: number) {
        const deletedCategory = await this.categoryModel.deleteCategory(id);
        if(!deletedCategory) throw new ForbiddenException('Error: something went wrong');
        return deletedCategory;
    }
}
