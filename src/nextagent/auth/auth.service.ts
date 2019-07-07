import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities';
import { UserModel } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { ROLES } from '../types';

@Injectable()
export class AuthService {
    constructor(
        private readonly $usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    private async validate(userData: User): Promise<User> {
        return await this.$usersService.getByEmail(userData.email);
    }

    public async loginFO(data: any): Promise<any | { status: number }> {
        const user = new User();
        user.email = data.username;
        user.plainPassword = data.password;
        return await this.validate(user).then(userData => {
            if (!userData || userData.role === ROLES.admin) {
                throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);
            }
            const payload = `${userData.email}${userData.id}`;
            const accessToken = this.jwtService.sign(payload);
            return {
                user: new UserModel(userData),
                token: accessToken,
            };
        });
    }

    public async loginBO(data: any): Promise<any | { status: number }> {
        const user = new User();
        user.email = data.username;
        user.plainPassword = data.password;
        return await this.validate(user).then(userData => {
            if (!userData || userData.role !== ROLES.admin) {
                throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);
            }
            const payload = `${userData.email}${userData.id}`;
            const accessToken = this.jwtService.sign(payload);
            return {
                user: new UserModel(userData),
                token: accessToken,
            };
        });
    }

    public async register(user: any): Promise<any> {
        return this.$usersService.addUser(user);
    }
}
