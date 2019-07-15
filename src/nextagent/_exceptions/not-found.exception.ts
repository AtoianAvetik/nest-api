import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor(message) {
        super({
                code: HttpStatus.NOT_FOUND,
                message,
            },
            HttpStatus.NOT_FOUND);
    }
}
