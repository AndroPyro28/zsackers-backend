import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { User } from 'src/models';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    private readonly userModel: User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.userModel.updateUser(id, updateUserDto);

    if(!result) throw new ForbiddenException('Something went wrong');

    return {
      count: 1
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
