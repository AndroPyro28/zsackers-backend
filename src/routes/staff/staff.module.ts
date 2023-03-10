import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { Profile, Staff, User } from 'src/models';
import { ArgonHelper } from 'src/common/helpers/argon.helper';
import { SMTP } from 'src/common/utils';
import { RandomGenerator } from 'src/common/helpers';

@Module({
  controllers: [StaffController],
  providers: [StaffService, User, ArgonHelper, SMTP, Staff, Profile, RandomGenerator]
})
export class StaffModule {}
