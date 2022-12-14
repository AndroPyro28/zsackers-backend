import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/models';
import { AtStrategy } from './strategies';
import { ArgonHelper } from 'src/common/helpers/argon.helper';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, User, AtStrategy, ArgonHelper],
})
export class AuthModule {}
