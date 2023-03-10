import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProduct } from 'src/routes/product/dto/product.dto';
import { product } from './root.model';
import { Product as ProductModel } from '@prisma/client';

@Injectable()
export class Product {
  async createProduct(body: CreateProductDto) {
    if(body.quantity == 0 || !body.quantity) {
      body.quantity = 1;
    }
    console.log(body)
    try {
      const newProduct = await product.create({
        data: {
          productName: body.productName,
          price: body.productPrice,
          image_url: body.image_url,
          stock: body.productStock,
          quantity: body.quantity,
          image_id: body.image_id,
          details: body.details,
          categoryId: Number(body.categoryId),
          subcategoryId: !body.subcategoryId ? null : Number(body.subcategoryId) ,
          productType : body.productType
        },
      });
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllProducts(search: search): Promise<ProductModel[]> {
    try {
      const arr = [
        search.productName !== "" && {
         productName: {
          contains: search.productName
         }
        },
        search.categoryId !== 0 && {
         categoryId: search.categoryId
        },
        search.subcategoryId !== 0 && {
         subcategoryId: search.subcategoryId
        },
       ];
      const conditionArr = arr.filter(value => typeof value === 'object')
      const products = await product.findMany({
        where: {
          AND: conditionArr,
          archive: false,
        },
        include: {
          category: true,
          sub_category: true,
          bundleParentProduct: {
            select: {
              id: true,
              bundleChildProduct: true,
            }
          },
          bundleChildProduct: {
            select: {
              id: true,
              bundleParentProduct: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductsByArrayOfId(arrayId: number[]) {
    try {
      const result = await product.findMany({
        where: {
          id: {
            in: arrayId
          },
          archive: false
        }
      })
      return result;
    } catch (error) {
      console.error(error)
    }
  }

  async retrieveCancelledProductsStocks (productToRetrieve: {id: number, stock: number}[]) {
    try {
      productToRetrieve.forEach(async (p) => {
         await product.update({
          where: {
            id: p.id,
          },
          data: {
            stock: {
              increment: p.stock
            }
          }
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getProductById(id: number) {
    try {
      const result = await product.findUnique({
        where: {
          id,
        },
        include:{
          category: true,
          sub_category: true,
          bundleParentProduct: {
            select: {
              id: true,
              bundleChildProduct: true,
            }
          },
          bundleChildProduct: {
            select: {
              id: true,
              bundleParentProduct: true,
            }
          }
        }
      })
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async archiveProductById(id: number) {
    try {
      const archived = await product.update({
        where: {
          id
        },
        data: {
          archive: true
        }
      })
      return archived;
    } catch (error) {
      console.error(error)
    }
  }

  async updateProductsStocks(products: {id: number, quantity: number}[]) {
    try {
      products.forEach(async (p) => {
       await product.updateMany({
          where: {
            id: p.id,
            productType: 'SINGLE'
          },
          data: {
            stock: {
              decrement: p.quantity
            },
          },
        })
      })
    } catch (error) {
      console.error(error)
    }
  }


  async updateProduct(id: number, body: UpdateProduct) {
    try {
      delete body.id;
      delete body.bundleChildrenProductIds
      const updated = await product.update({
        where: {
          id
        },
        data: {
          ...body,
        },
      })
      return updated;
    } catch (error) {
      console.error(error)
    }
  }
}
