import { Injectable } from '@nestjs/common';
import { SignupDto, UpdatePasswordDto } from 'src/routes/auth/dto/auth.dto';
import { UpdateUserDto } from 'src/routes/user/dto/update-user.dto';
import { user } from './root.model';

@Injectable()
export class User {
  async createUser(body: SignupDto){
    try {
      const { firstname, lastname, contact, address, email, password, role } =
        body;
      const newUser = await user.create({
        data: {
          email,
          password,
          role,
          profile: {
            create: { firstname, lastname, contact, address },
          },
        },
      });
      return newUser;
    } catch (error) {
      console.error(error);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const currentUser = await user.findFirst({
        where: { 
          email,
          status:'ACTIVE'
         },
        include: {
          profile: true,
        },
      });
      return currentUser;
    } catch (error) {
      console.error(error);
    }
  }
  async findUserByid(id: number) {
    try {
      const currentUser = await user.findUnique({
        where: {
          id,
        },
        include: {
          profile: true,
        },
      });
      return currentUser;
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUserResult = await user.update({
        where: {
          id
        },
        data: {
          profile: {
            update: {
              ...updateUserDto
            }
          }
        },
      })
      return updatedUserResult
    } catch (error) {
      console.error(error)
    }
  }

  async updatehashResetPwToken(userId: number, hashToken: string) {
    try {
      const update = await user.update({
        where: {
          id: userId,
        },
        data: {
          hashUpdatePWToken: hashToken
        }
      })

      return update
    } catch (error) {
      console.error(error)
    }
  }

  async updatePassword(userId:number, newPassword: string) {
    try {
      const update = await user.update({
        where: {
          id: userId,
        },
        data: {
          password: newPassword
        }
      })
      return update
    } catch (error) {
      console.error(error)
    }
  }
}

interface ProfileInterface {
  id:never;
  userId:never;
  firstname: string;
  lastname: string;
  contact: string;
  address: string;
  imageUrl: string;
}

export default interface UserInteface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password?: string;
  hashUpdatePWToken?: string | null;
  isVerify: boolean;
  role: 'ADMIN' | 'CUSTOMER' | 'STAFF';
  profile: ProfileInterface
}
