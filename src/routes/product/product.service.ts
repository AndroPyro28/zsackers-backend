import { ForbiddenException, Injectable } from '@nestjs/common';
import { Cloudinary } from 'src/common/utils/cloudinary.utils';
import { Product } from 'src/models';
import { CreateProductDto, UpdateProduct } from './dto/product.dto';

@Injectable()
export class ProductService {
    // zsackers_product_image upload preset

    /**
     *
     */
    constructor(private readonly cloudinary: Cloudinary, private readonly productModel: Product) {}

    async createProduct(body: CreateProductDto) {
        let imageInfo = {
            image_url: '',
            image_id: ''
        }
        if(body?.image) {
            const {secure_url, public_id} = await this.cloudinary.cloudinaryUpload(body.image, 'zsackers_product_image')
            imageInfo = {
                image_url: secure_url,
                image_id: public_id
            }
        }
       
        body = {...body, ...imageInfo};
        const newProduct = await this.productModel.createProduct(body);

        if(!newProduct) throw new ForbiddenException('something went wrong...');

        return newProduct;
    }

    async getAllProducts(search: search) {
        const products = await this.productModel.getAllProducts(search);
        return products;
    }

    async getProductById(id: number) {
        const product = await this.productModel.getProductById(id);
        return product;
    }

    async archiveProductById(id: number) {
      const archivedProduct = await this.productModel.archiveProductById(id)
      return archivedProduct
    }

    async updateProduct(id: number, body: UpdateProduct) {
        this.cloudinary.cloudinaryDelete(body.image_id)
        const {secure_url, public_id} = await this.cloudinary.cloudinaryUpload(body.image_url, 'zsackers_product_image')
        body.image_url = secure_url;
        body.image_id = public_id
        const updateProduct = await this.productModel.updateProduct(id, body)
        return updateProduct
    }

}
