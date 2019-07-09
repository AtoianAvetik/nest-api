import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../../_config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
                private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: false,
            secretOrKey: configService.get('SESSION_SECRET'),
        });
    }

    async validate(payload: JwtPayload, done: (...args: any[]) => void) {
        return await this.authService.validateUser(payload)
            .then(signedUser => done(null, signedUser))
            .catch(err => done(err, false));
    }
}

export const callback = (err, user, info) => {
    let message;
    if (err) {
        return (err || new UnauthorizedException(info.message));
    } else if (typeof info !== 'undefined' || !user) {
        switch (info.message) {
            case 'No auth token':
            case 'invalid signature':
            case 'jwt malformed':
            case 'invalid token':
                message = 'You must provide a valid authenticated access token';
                break;
            case 'jwt expired':
                message = 'Your session has expired';
                break;
            default:
                message = info.message;
                break;
        }
        throw new UnauthorizedException(message);
    }
    return user;
};
