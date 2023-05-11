import { Body, Controller, HttpCode, Post, HttpStatus, Get } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import UserInteface from 'src/models/user.model';
import { AuthService } from './auth.service';
import { ChangePasswordDto, confirmResetCodeDto, SigninDto, SignupDto, UpdatePasswordDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @Public()
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() body: SignupDto): Promise<{success: boolean}> {
        return this.authService.signup(body)
    }

    @Post('signin')
    @Public()
    @HttpCode(HttpStatus.OK)
    async signin(@Body() body: SigninDto): Promise<{access_token: string}> {
        return this.authService.signin(body)
    }

    @Get('me')
    @Roles(['ADMIN', 'CUSTOMER', 'STAFF', 'DELIVERY'])
    @HttpCode(HttpStatus.OK)
    async authMe(@GetCurrentUser() currentUser: UserInteface) {
        delete currentUser.password
        delete currentUser.hashUpdatePWToken
        return currentUser;
    }

    @Post('forgot-password')
    @Public()
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body('email') email: string) {
        return this.authService.forgotPassword(email)
    }

    @Post('confirm-reset-code')
    @Public()
    @HttpCode(HttpStatus.OK)
    async confirmResetCode(@Body() body: confirmResetCodeDto) {
        return this.authService.confirmResetCode(body)
    }

    @Post('update-password')
    @Roles(['ADMIN', 'CUSTOMER', 'STAFF'])
    @HttpCode(HttpStatus.OK)
    async updatePassword(
        @GetCurrentUser('id') userId: number,
        @Body() body: UpdatePasswordDto
        ) {
        return this.authService.updatePassword(userId ,body)
    }

    @Post('change-password')
    @Roles(['ADMIN', 'CUSTOMER', 'STAFF'])
    @HttpCode(HttpStatus.OK)
    async changePassword(
        @GetCurrentUser('id') userId: number,
        @Body() body: ChangePasswordDto
        ) {
        return this.authService.changePassword(userId ,body)
    }
}
