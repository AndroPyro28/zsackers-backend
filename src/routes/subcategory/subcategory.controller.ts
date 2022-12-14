import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { CreateSubcategoryDto, UpdateSubCategoryDto } from './dto';
import { SubcategoryService } from './subcategory.service';

@Controller('subcategory')
export class SubcategoryController {

    constructor(private readonly subCategoryService: SubcategoryService) {}

    @Post('')
    @Roles(['ADMIN'])
    async createSubcategory(@Body() body: CreateSubcategoryDto) {
        return this.subCategoryService.createSubcategory(body)
    }

    @Post('')
    @Roles(['ADMIN'])
    async getAllSubcategory() {
        return this.subCategoryService.getAllSubcategory()
    }

    @Patch(':id')
    @Roles(['ADMIN'])
    async updateSubcategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateSubCategoryDto
    ) {
         return this.subCategoryService.updateSubcategory(id, body)
    }

    @Delete(':id')
    @Roles(['ADMIN'])
    async deleteSubcategory(
        @Param('id', ParseIntPipe) id: number,
    ) {
         return this.subCategoryService.deleteSubcategory(id)
    }

}
