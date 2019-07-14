import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { REPOSITORIES } from '../constans';
import { Agent, User } from '../entities';
import { UserModel, UserViewModel } from './user.model';
import { NotFoundException } from '../_exceptions';

@Injectable()
export class UsersService {
    constructor(@Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>) {
    }

    async getAll(): Promise<UserModel[]> {
        const usersData = await this.usersRepository.find();
        return Promise.resolve(usersData.map(user => {
            return new UserModel(user);
        }));
    }

    async getCurrent(domain: string): Promise<UserViewModel> {
        const agentData = await this.agentsFindOne({domain});
        const userData = await this.usersFindOne({id: agentData.agentUsers[0]});
        const user = new UserViewModel(userData);
        return Promise.resolve(user);
    }

    async checkExists(email: string): Promise<{ email: string }> {
        const user = await this.usersFindOne({email});
        if (user) {
            return {email: user.email};
        } else {
            throw false;
        }
    }

    async getById(id: number): Promise<UserViewModel> {
        const userData = await this.usersFindOne({id});
        const user = new UserViewModel(userData);
        return Promise.resolve(user);
    }

    async getByEmail(email: string): Promise<User> {
        return await this.usersFindOne({email});
    }

    async addUser(data: any): Promise<UserViewModel> {
        const entity = Object.assign(new User(), data);
        const userData = await this.usersRepository.save(entity);
        return Promise.resolve(new UserViewModel(userData));
    }

    async updateUser(id, data: any): Promise<UserViewModel> {
        const entity = Object.assign(new User(), data);
        await this.usersRepository.update({id}, entity);
        return await this.getById(id);
    }

    async deleteUser(id: number): Promise<any> {
        const res = await this.usersRepository.delete({id});
        if ( res.affected === 0 ) {
            throw new NotFoundException( 'User not found' );
        }
    }

    async usersFindOne( condition ): Promise<User> {
        const userData = await this.usersRepository.findOne( condition );
        if ( !userData ) {
            throw new NotFoundException( 'User not found' );
        }
        return userData;
    }

    async agentsFindOne( condition ): Promise<Agent> {
        const agentData = await this.agentsRepository.findOne( condition );
        if ( !agentData ) {
            throw new NotFoundException( 'Agent not found' );
        }
        return agentData;
    }
}
