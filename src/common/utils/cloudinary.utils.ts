import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class Cloudinary {
    /**
     *
     */
    constructor() {}

    async cloudinaryUpload(base64: string, upload_preset: string) {
        try {
            const result = await cloudinary.uploader.upload(base64, {
              upload_preset,
            //   resource_type: '',
            });
            return {
              secure_url: result?.url,
              public_id: result?.public_id,
            };
          } catch (error) {
            console.error('error cloudinary upload', error)
          }
    }

    async cloudinaryDelete(public_id: string) {
        try {
            const result = await cloudinary.uploader.destroy(public_id);
            return result;
          } catch (error) {
            console.error('error cloudinary delete', error)
          }
    }
}