import {
    ExecutionContext, HttpException,
    Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardException } from '../../_exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        let message;
        if (err) {
            if ( err.message && err.response && err.status ) {
                throw new HttpException(err.response, err.status);
            }
            return (err || new AuthGuardException(info.message));
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
            throw new AuthGuardException(message);
        }
        return user;
    }
}
