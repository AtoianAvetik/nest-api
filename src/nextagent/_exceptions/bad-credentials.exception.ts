import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class BadCredentialsException extends UnauthorizedException {
    constructor() {
        super({
            code: HttpStatus.UNAUTHORIZED,
            message: 'Bad credentials',
        });
    }
}
