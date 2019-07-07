import { Controller, Get, Param, Req, Headers } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserViewModel } from './user.model';
import { UserEmailDto, UserViewDto } from './dto';

@ApiUseTags('Users')
@Controller('nextagent/api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiResponse({status: 200, description: 'Returns currently logged in user', type: UserViewDto})
    @Get('current')
    getCurrent(@Headers('X-Agent-Domain') header: any): Promise<UserViewModel> {
        // TODO
        const domain = 'a1';
        return this.usersService.getCurrent(domain);
    }

    @ApiResponse({status: 200, description: 'Returns email of the user if it exists', type: UserEmailDto})
    @Get('exists/:email')
    checkExists(@Param('email') email: string): Promise<{email: string}> {
        return this.usersService.checkExists(email);
    }
}
