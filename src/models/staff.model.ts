import { Injectable } from '@nestjs/common';
import { user } from './root.model';

@Injectable()
export class Staff {
  async findAll() {
    try {
        const allStaff = await user.findMany({

            where: {
                role:'STAFF',
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
        return allStaff
    } catch (error) {
        console.error(error)
    }
  }

  async updateOne(id: number, status: "INACTIVE" | "ACTIVE") {
    try {
      const updatedStaff = await user.update({
        where: {
          id,
        }, 
        data: {
          status
        }
      })
      return updatedStaff
    } catch (error) {
      console.error(error)
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedStaff = await user.delete({
        where: {
          id,
        }, 
      })
      return deletedStaff
    } catch (error) {
      console.error(error)
    }
  }
}

