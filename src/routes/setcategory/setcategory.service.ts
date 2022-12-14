import { ForbiddenException, Injectable } from '@nestjs/common';
import { SetCategory } from 'src/models';
import { CreateSetCategoryDto, UpdateSetCategoryDto } from './dto';

@Injectable()
export class SetCategoryService {

    /**
     *
     */
    constructor(private readonly setCategoryModel: SetCategory) {
    }
    async createSetCategory(body: CreateSetCategoryDto) {
        const newSetCategory = this.setCategoryModel.createSetCategory(body)

        if(!newSetCategory) throw new ForbiddenException('Something went wrong...')

        return newSetCategory;
    }

    async getAllSetCategory() {
        const setCategories = await this.setCategoryModel.getAllSetCategory()
        return setCategories
    }

    async updateSetcategory(id: number, body: UpdateSetCategoryDto) {
        const updatedSetCategory = await this.setCategoryModel.updateSetcategory(id, body)
        if(!updatedSetCategory) throw new ForbiddenException('Error: something went wrong')
        return updatedSetCategory
    }

    async deleteSetcategory(id: number) {
        const deleteSetCategory = await this.setCategoryModel.deleteSetcategory(id);
        if(!deleteSetCategory) throw new ForbiddenException('Error: something went wrong...')
        return deleteSetCategory;
    }
}