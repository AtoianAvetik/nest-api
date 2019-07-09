import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { ROLES } from '../types';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CryptographerService } from './cryptographer.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly $usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly $cryptoService: CryptographerService,
    ) {
    }

    public async login(data: any, fo = false): Promise<any | { status: number }> {
        const userData = await this.$usersService.getByEmail(data.username);

        if ((fo && (!userData || userData.role === ROLES.admin)) ||
            (!fo && (!userData || userData.role !== ROLES.admin)) ) {
            throw new UnauthorizedException('Bad credentials');
        }

        if ( !this.$cryptoService.checkPassword(userData.plainPassword, data.password) ) {
            throw new UnauthorizedException('Invalid password');
        }

        return await this.createToken(userData);
    }

    public async register(user: any): Promise<any> {
        return this.$usersService.addUser(user);
    }

    async createToken(signedUser: any): Promise<any> {
        const payload: JwtPayload = { email: signedUser.email };
        const accessToken = this.jwtService.sign(payload);
        return {
            user: new UserModel(signedUser),
            token: accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.$usersService.getByEmail(payload.email)
            .then(signedUser => Promise.resolve(signedUser))
            .catch(err => Promise.reject(new UnauthorizedException('Invalid Authorization')));
    }
}
