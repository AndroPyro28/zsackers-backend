import { Injectable } from '@nestjs/common';
import { user } from './root.model';

@Injectable()
export class Delivery {
  async findAll() {
    try {
        const allDelivery = await user.findMany({

            where: {
                role:'DELIVERY',
            },
            select: {
              id: true,
              isVerify: true,
              email: true,
              status: true,
              role: true,
              profile: true,
              createdAt: true
            },

        })
        return allDelivery
    } catch (error) {
        console.error(error)
    }
  }

  async updateOne(id: number, status: "INACTIVE" | "ACTIVE") {
    try {
      const updatedDelivery = await user.update({
        where: {
          id,
        }, 
        data: {
          status
        }
      })
      return updatedDelivery
    } catch (error) {
      console.error(error)
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedDelivery = await user.delete({
        where: {
          id,
        }, 
      })
      return deletedDelivery
    } catch (error) {
      console.error(error)
    }
  }
}

