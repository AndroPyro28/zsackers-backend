import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { User } from '../user/entities/user.entity';
import { ArgonHelper, RandomGenerator } from 'src/common/helpers';
import { SMTP } from 'src/common/utils';
import { Profile } from 'src/models';
import { Delivery } from 'src/models/delivery.model';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService, User, Delivery, ArgonHelper, SMTP, Profile, RandomGenerator]
})
export class DeliveryModule {}
