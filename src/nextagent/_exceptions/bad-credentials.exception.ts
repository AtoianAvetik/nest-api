import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class BadCredentialsException extends UnauthorizedException {
    constructor(message?) {
        super({
            code: HttpStatus.UNAUTHORIZED,
            message: message || 'Bad credentials',
        });
    }
}
