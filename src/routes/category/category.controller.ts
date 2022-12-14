import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {

    /**
     *
     */
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    // @Roles(['ADMIN', 'STAFF', 'CUSTOMER'])
    @Public()
    @HttpCode(HttpStatus.OK)
    async getAllCategories(@Query('search') search: string ) {
        return this.categoryService.getAllCategories(search)
    }

    @Post('')
    @Roles(['ADMIN'])
    @HttpCode(HttpStatus.CREATED)
    async createCategory(@Body() body: CreateCategoryDto) {
        return this.categoryService.createCategory(body)
    }

    @Patch(':id')
    @Roles(['ADMIN'])
    async updatecategory(
        @Param('id', ParseIntPipe) id: number,
        @Body('category') category: string
    ) {
        return this.categoryService.updateCategory(id, category)
    }

    @Delete(':id')
    @Roles(['ADMIN'])
    async deleteCategory(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.categoryService.deleteCategory(id)
    }
}
