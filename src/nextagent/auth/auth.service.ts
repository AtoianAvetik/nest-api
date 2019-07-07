import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserBO } from '../entities';
import { UsersService } from '../users/users.service';
import { UsersBOService } from '../users-bo/users-bo.service';
import { UserBOModel } from '../users-bo/user-bo.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly $usersService: UsersService,
        private readonly $usersBOService: UsersBOService,
        private readonly jwtService: JwtService,
    ) {
    }

    private async validateFO(userData: User): Promise<User> {
        return await this.$usersService.getByEmail(userData.email);
    }

    private async validateBO(userData: UserBO): Promise<UserBO> {
        return await this.$usersBOService.getByEmail(userData.email);
    }

    public async loginBO(data: any): Promise<any | { status: number }> {
        const user = new UserBO();
        user.email = data.username;
        user.password = data.password;
        return await this.validateBO(user).then(userData => {
            return this.login(userData);
        });
    }

    public async loginFO(data: any): Promise<any | { status: number }> {
        const user = new User();
        user.email = data.username;
        user.plainPassword = data.password;
        return await this.validateFO(user).then(userData => {
            return this.login(userData);
        });
    }

    private login(userData: User | UserBO): any | { status: number } {
        if (!userData) {
            throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);
        }
        const payload = `${userData.email}${userData.id}`;
        const accessToken = this.jwtService.sign(payload);
        return {
            user: new UserBOModel(userData),
            token: accessToken,
        };
    }

    public async register(user: any): Promise<any> {
        return this.$usersBOService.addUser(user);
    }
}
