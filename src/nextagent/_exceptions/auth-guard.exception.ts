import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class AuthGuardException extends UnauthorizedException {
    constructor(message) {
        super({
            code: HttpStatus.UNAUTHORIZED,
            message,
        });
    }
}
