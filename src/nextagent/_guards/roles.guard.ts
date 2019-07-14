import { Reflector } from '@nestjs/core';
import {
    BadRequestException,
    CanActivate,
    ExecutionContext, HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => roles.includes(user.role);
        if (user && user.role && !hasRole()) {
            throw new BadRequestException({code: HttpStatus.BAD_REQUEST, message: 'You do not have access to this action.'});
        }
        return user && user.role && hasRole();
    }
}
