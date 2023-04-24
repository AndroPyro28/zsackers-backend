import { Injectable } from '@nestjs/common';
import { user } from './root.model';

@Injectable()
export class Admin {
  async findAll() {
    try {
        const allAdmin = await user.findMany({

            where: {
                role:'ADMIN',
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
        return allAdmin
    } catch (error) {
        console.error(error)
    }
  }

  async updateOne(id: number, status: "INACTIVE" | "ACTIVE") {
    try {
      const updateAdmin = await user.update({
        where: {
          id,
        }, 
        data: {
          status
        }
      })
      return updateAdmin
    } catch (error) {
      console.error(error)
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedAdmin = await user.delete({
        where: {
          id,
        }, 
      })
      return deletedAdmin
    } catch (error) {
      console.error(error)
    }
  }
}

