import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto';
import { TAGS } from '../constans';
import { UserCreateDto, UserViewDto } from '../users/dto';
import { ExceptionDto } from '../_dto';

@ApiUseTags(TAGS.login)
@Controller('nextagent/api/v1')
export class AuthController {
    constructor(private readonly  authService: AuthService) {
    }

    @ApiOperation({title: '', description: 'Back-office login into the API.'})
    @ApiResponse({status: 200, description: 'Login successful', type: LoginResponseDto})
    @ApiResponse({status: 401, description: 'Login failed', type: ExceptionDto})
    @Post('login')
    async login(@Body() user: LoginDto): Promise<{ token: string }> {
        return this.authService.login(user);
    }

    @ApiOperation({title: '', description: 'Front-office login into the FO API.'})
    @ApiResponse({status: 200, description: 'Login successful', type: LoginResponseDto})
    @ApiResponse({status: 401, description: 'Login failed', type: ExceptionDto})
    @Post('fo_login')
    async loginFO(@Body() user: LoginDto, @Headers('x-agent-domain') domain: string): Promise<{ token: string }> {
        return this.authService.login(user, true, domain);
    }

    @ApiResponse({status: 200, description: 'User created', type: UserViewDto})
    @Post('register')
    async register(@Body() user: UserCreateDto): Promise<any> {
        return this.authService.register(user);
    }
}
