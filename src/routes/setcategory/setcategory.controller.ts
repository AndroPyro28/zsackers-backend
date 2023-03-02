// import { Controller, HttpCode, Post, HttpStatus, Body, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
// import { Roles } from 'src/common/decorators';
// import { CreateSetCategoryDto, UpdateSetCategoryDto } from './dto';
// import { SetCategoryService } from './setcategory.service';

// @Controller('setcategory')
// export class SetCategoryController {

//     /**
//      *
//      */
//     constructor(private readonly setCategoryService: SetCategoryService) {}

//     @Post()
//     @Roles(['ADMIN'])
//     @HttpCode(HttpStatus.CREATED)
//     async createFlavorCategory(@Body() body: CreateSetCategoryDto) {
//         return this.setCategoryService.createSetCategory(body)
//     }

//     @Post('')
//     @Roles(['ADMIN'])
//     async getAllSubcategory() {
//         return this.setCategoryService.getAllSetCategory()
//     }

//     @Patch(':id')
//     @Roles(['ADMIN'])
//     async updateSetcategory(
//         @Param('id', ParseIntPipe) id: number,
//         @Body() body: UpdateSetCategoryDto
//     ) {
//          return this.setCategoryService.updateSetcategory(id, body)
//     }

//     @Delete(':id')
//     @Roles(['ADMIN'])
//     async deleteSetcategory(
//         @Param('id', ParseIntPipe) id: number,
//     ) {
//          return this.setCategoryService.deleteSetcategory(id)
//     }
// }