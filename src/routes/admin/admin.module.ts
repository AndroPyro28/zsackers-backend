import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from 'src/models/admin.model';
import { Profile, Staff, User } from 'src/models';
import { ArgonHelper, RandomGenerator } from 'src/common/helpers';
import { SMTP } from 'src/common/utils';

@Module({
  controllers: [AdminController],
  providers: [AdminService, Admin,User, ArgonHelper, SMTP, Profile, RandomGenerator]
})
export class AdminModule {}
