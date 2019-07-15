import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
            secretOrKey: configService.get('SESSION_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtPayload, done) {
        const user = await this.authService.validateUser(payload);
        const validated = await this.authService.validateDomain(user.agent, req.headers['x-agent-domain']);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (!validated) {
            throw new BadRequestException({code: HttpStatus.BAD_REQUEST, message: 'You do not have access to this action.'});
        }
        return done(null, user);
    }
}
