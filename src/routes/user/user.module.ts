import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/models';

@Module({
  controllers: [UserController],
  providers: [UserService, User]
})
export class UserModule {}
