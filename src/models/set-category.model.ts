// import { Injectable } from "@nestjs/common";
// import { CreateSetCategoryDto, UpdateSetCategoryDto } from "src/routes/setcategory/dto";
// import { set_Category } from "./root.model";
// @Injectable()

// export class SetCategory {
//     async createSetCategory(body:CreateSetCategoryDto) {
//         try {
//             const newSetCategory = await set_Category.create({
//                 data: {
//                     name: body.setcategory,
//                     premium: Boolean(body.premium),
//                     subcategoryId: body.subcategoryId
//                 }
//             })
//             return newSetCategory;
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     async getAllSetCategory() {
//         try {
//             const setCategories = await set_Category.findMany()
//             return setCategories;
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     async updateSetcategory(id: number, body: UpdateSetCategoryDto) {
//         try {
//             const updatedSetCategory = await set_Category.update({
//                 where: {
//                     id
//                 },
//                 data: {
//                     name: body.setcategory,
//                     premium: Boolean(body.premium),
//                 }
//             })
//             return updatedSetCategory;
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     async deleteSetcategory(id: number) {
//         try {
//             const deletedSetCategory = await set_Category.delete({
//                 where: {
//                     id
//                 }
//             })
//             return deletedSetCategory;
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }