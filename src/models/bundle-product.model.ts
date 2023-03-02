import { Injectable } from '@nestjs/common';
import { bundles } from './root.model';

@Injectable()
export class Bundles {

  async createBundle(parentProductId: number, childProductIds: number[]) {
    try {
        const bundlesPackage = childProductIds.map((productId) => ({
            bundleParentProductId: parentProductId, 
            bundleChildProductId: productId
           }))
      const newBundles = await bundles.createMany({
        data: bundlesPackage
      })

      return newBundles
    } catch (error) {
      console.error(error)
    }
  }
  
}
