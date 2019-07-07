import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginExceptionDto, LoginResponseDto } from './dto';
import { TAGS } from '../types';
import { UserCreateDto, UserViewDto } from '../users/dto';

@ApiUseTags(TAGS.login)
@Controller('nextagent/api/v1')
export class AuthController {
    constructor(private readonly  authService: AuthService) {
    }

    @ApiResponse({status: 200, description: 'Login successful', type: LoginResponseDto})
    @ApiResponse({status: 401, description: 'Login failed', type: LoginExceptionDto})
    @Post('login')
    async login(@Body() user: LoginDto): Promise<{token: string}> {
        return this.authService.loginBO(user);
    }

    @ApiResponse({status: 200, description: 'Login successful', type: LoginResponseDto})
    @ApiResponse({status: 401, description: 'Login failed', type: LoginExceptionDto})
    @Post('fo_login')
    async loginFO(@Body() user: LoginDto, @Headers('x-agent-domain') domain: string): Promise<{token: string}> {
        return this.authService.loginFO(user);
    }

    @ApiResponse({status: 200, description: 'User created', type: UserViewDto})
    @Post('register')
    async register(@Body() user: UserCreateDto): Promise<any> {
        return this.authService.register(user);
    }
}
