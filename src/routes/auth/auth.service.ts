import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import {User} from 'src/models/';
import { ChangePasswordDto, confirmResetCodeDto, SigninDto, SignupDto, UpdatePasswordDto } from './dto/auth.dto';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types';
import { ArgonHelper } from 'src/common/helpers/argon.helper';
import * as randomize from 'randomatic';
import { sendEmailModel, SMTP } from 'src/common/utils';


@Injectable()
export class AuthService {

    constructor(
        private readonly userModel: User,
        private readonly jwtService: JwtService,
        private readonly argonhelper: ArgonHelper,
        private readonly smtpHelper: SMTP
        ) {}

    async signup(body: SignupDto) {
        body.password = await this.argonhelper.hash(body.password)
        const newUser = await this.userModel.createUser(body);
        if(!newUser) throw new ForbiddenException('Email already exist');

        return {
            success: true
        }
    }

    async signin(body: SigninDto) {
        const user = await this.userModel.findUserByEmail(body.email);

        if(!user) throw new ForbiddenException('Invalid Credentials');
        const isMatched = await argon.verify(user.password, body.password);

        if(!isMatched) throw new ForbiddenException('Invalid Credentials');

        const access_token = await this.signToken({id: user.id, email: user.email});
        return {
            access_token,
            role: user.role.toLocaleLowerCase()
        }
    }

    async forgotPassword(email: string) {
        const user = await this.userModel.findUserByEmail(email);
        if(!user) throw new ForbiddenException('Invalid Credentials');

        const password_reset_code = randomize('aA0', 8);

        const password_reset_token = this.jwtService.sign(
            {
              id: user.id,
              password_reset_code,
            },
            {
              expiresIn: '5m',
              secret: process.env.PASSWORD_RESET_TOKEN_SECRET,
            },
          );

          await this.userModel.updatehashResetPwToken(user.id, password_reset_token);

          const smtp: sendEmailModel = {
            subject: `Password Reset Code`,
            content: `<div> 
                <h3> hello ${user.profile.firstname}</h3>
      
                <p> This is your password reset code. ${password_reset_code} </p>
      
                <small> - Zsackers cafe | ADMIN </small>
            </div>`,
            emailTo: user.email,
          };

          this.smtpHelper.sendEmail(smtp);

          return {
            message: `We sent a code to your email to reset your password. Please check your email.`,
          };
    }

    async confirmResetCode(body: confirmResetCodeDto) {
        const user = await this.userModel.findUserByEmail(body.email);

        if (!user || !user.hashUpdatePWToken) {
            throw new ForbiddenException('Invalid credentials');
          }

          try {
            const decoded = this.jwtService.verify(user.hashUpdatePWToken, {
              secret: process.env.PASSWORD_RESET_TOKEN_SECRET,
            });
      
            // check if password_reset_code not match
            if (decoded.password_reset_code !== body.code) {
              throw new ForbiddenException('Invalid credentials');
            }
      
            // remove password_reset_token

            await this.userModel.updatehashResetPwToken(user.id, '');
      
            // generate tokens
            const token = await this.signToken({id: user.id, email: user.email});
            
            // return tokens
            return {
                success: true,
                token
            };
          } catch (error) {
            throw new ForbiddenException(
              'Code is Invalid or Expired. Please request a new code.',
            );
          }
    }

    async updatePassword (userId:number, body: UpdatePasswordDto) {
      const hashPw = await this.argonhelper.hash(body.password)
      const resetPassword = await this.userModel.updatePassword(userId, hashPw);
      if(!resetPassword) throw new ForbiddenException('Password reset failed');

      return {
        count: 1
      }
    }

    async changePassword (userId: number, body: ChangePasswordDto) {
      const user = await this.userModel.findUserByid(userId);
      if(!user) throw new ForbiddenException('Invalid Credentials');

      const isPasswordMatch = await this.argonhelper.compare(body.oldPassword, user.password)
      if(!isPasswordMatch) throw new ForbiddenException('incorrect old password ');

      const hashPw = await this.argonhelper.hash(body.newPassword)

      const resetPassword = await this.userModel.updatePassword(userId, hashPw);
      if(!resetPassword) throw new ForbiddenException('Password reset failed');

      return {
        count: 1,
        status: 200
      }
    }

    async signToken({id, email}: TokenPayload) {
        return this.jwtService.sign({id, email}, {
            secret: process.env.JWT_ACCESS_TOKEN,
            expiresIn: '1d'
        });
    }
}
