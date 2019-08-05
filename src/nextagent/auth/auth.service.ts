import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { AgentsService } from '../agents/agents.service';
import { ROLES } from '../constans';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CryptographerService } from './cryptographer.service';
import { BadCredentialsException } from '../_exceptions';

@Injectable()
export class AuthService {
    constructor(
        private readonly $usersService: UsersService,
        private readonly $agentsService: AgentsService,
        private readonly jwtService: JwtService,
        private readonly $cryptoService: CryptographerService,
    ) {
    }

    public async login(data: any, fo = false, domain?): Promise<any | { status: number }> {
        const userData = await this.$usersService.getByEmail(data.username);

        if (fo) {
            if (domain) {
                const agentData = await this.$agentsService.agentsFindOne({domain});
                if (userData.agent !== agentData.id) {
                    throw new BadCredentialsException();
                }
            } else {
                throw new BadCredentialsException('X-Agent-Domain missed.');
            }
        }

        if ((fo && (!userData || userData.role === ROLES.admin)) ||
            (!fo && (!userData || userData.role !== ROLES.admin))) {
            throw new BadCredentialsException();
        }

        if (!this.$cryptoService.checkPassword(userData.plainPassword, data.password)) {
            throw new BadCredentialsException();
        }

        return await this.createToken(userData);
    }

    public async register(user: any): Promise<any> {
        return this.$usersService.addUser(user);
    }

    async createToken(signedUser: any): Promise<any> {
        const payload: JwtPayload = {email: signedUser.email};
        const accessToken = this.jwtService.sign(payload);
        return {
            user: new UserModel(signedUser),
            token: accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.$usersService.getByEmail(payload.email);
    }

    async validateDomain(agentID, domain): Promise<any> {
        if ( agentID && domain ) {
            const agentData = await this.$agentsService.agentsFindOne({id: agentID});
            return agentData && domain === agentData.domain;
        }
    }
}
