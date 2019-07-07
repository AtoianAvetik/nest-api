import { Controller, Get, Param, Headers } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserViewModel } from './user.model';
import { UserEmailDto, UserViewDto } from './dto';
import { TAGS } from '../types';

@ApiUseTags(TAGS.users)
@Controller('nextagent/api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiResponse({status: 200, description: 'Returns currently logged in user', type: UserViewDto})
    @Get('current')
    getCurrent(@Headers('x-agent-domain') domain: string): Promise<UserViewModel> {
        return this.usersService.getCurrent(domain);
    }

    @ApiResponse({status: 200, description: 'Returns email of the user if it exists', type: UserEmailDto})
    @Get('exists/:email')
    checkExists(@Param('email') email: string): Promise<{email: string}> {
        return this.usersService.checkExists(email);
    }
}
