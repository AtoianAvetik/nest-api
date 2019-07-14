import { Controller, Get, Param, Headers, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiImplicitHeader, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserViewModel } from './user.model';
import { UserEmailDto, UserViewDto } from './dto';
import { TAGS, API_PATH } from '../constans';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiUseTags(TAGS.users)
@Controller(API_PATH + 'users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiOperation({title: 'Get current user', description: 'Accessible for every logged in User'})
    @ApiImplicitHeader({name: 'x-agent-domain', required: false})
    @ApiResponse({status: 200, description: 'Returns currently logged in user', type: UserViewDto})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('current')
    getCurrent(@Headers('x-agent-domain') domain: string): Promise<UserViewModel> {
        return this.usersService.getCurrent(domain);
    }

    @ApiOperation({title: 'Get user by email', description: 'Accessible for every logged in User\n' +
            'Only returns the email if it exists'})
    @ApiImplicitHeader({name: 'x-agent-domain', required: false})
    @ApiResponse({status: 200, description: 'Returns email of the user if it exists', type: UserEmailDto})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('exists/:email')
    checkExists(@Headers('x-agent-domain') domain: string, @Param('email') email: string): Promise<{email: string}> {
        return this.usersService.checkExists(email);
    }
}
