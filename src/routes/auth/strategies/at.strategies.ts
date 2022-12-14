import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/models";
interface JwtPayload {
    id:number;
    email: string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt_access_token') {
    /**
     *
     */
    constructor(private readonly userModel: User) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:process.env.JWT_ACCESS_TOKEN
        });
    }

    async validate(payload: JwtPayload) {
        const {id} = payload;
        const currentUser = await this.userModel.findUserByid(id);

        if(!currentUser) throw new ForbiddenException('Session Expired');
        
        return currentUser;
    }
}