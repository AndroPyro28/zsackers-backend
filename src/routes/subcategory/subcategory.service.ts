import { ForbiddenException, Injectable } from '@nestjs/common';
import { Subcategory } from 'src/models';
import { CreateSubcategoryDto, UpdateSubCategoryDto } from './dto';

@Injectable()
export class SubcategoryService {
    /**
     *
     */
    constructor(private readonly subCategoryModel: Subcategory) {}

    async createSubcategory(body: CreateSubcategoryDto) {
        const newSubcategory = await this.subCategoryModel.createSubcategory(body)

        if(!newSubcategory) throw new ForbiddenException('Category already exist');
        
        return newSubcategory
    }

    async getAllSubcategory() {
        const subcategories = await this.subCategoryModel.getAllSubcategories()
        return subcategories
    }

    async updateSubcategory(id: number, body: UpdateSubCategoryDto) {
        const updatedcategory = await this.subCategoryModel.updateSubcategories(id, body)
        if(!updatedcategory) throw new ForbiddenException('Error: something went wrong')
        return updatedcategory
    }

    async deleteSubcategory(id: number) {
        const deletedCategory = await this.subCategoryModel.deleteCategory(id)
        if(!deletedCategory) throw new ForbiddenException('Error: something went wrong')
        return deletedCategory
    }
}
