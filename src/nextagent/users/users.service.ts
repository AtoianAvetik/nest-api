import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { REPOSITORIES } from '../types';
import { Agent, User } from '../entities';
import { UserModel, UserViewModel } from './user.model';
import { AgentsService } from '../agents/agents.service';

@Injectable()
export class UsersService {
    constructor(@Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>) {
    }

    async getAll(): Promise<UserModel[]> {
        return await new Promise(async (resolve, reject) => {
            const users = await this.usersRepository.find();

            resolve(users.map(user => {
                return new UserModel(user);
            }));
        });
    }

    async getCurrent(domain: string): Promise<UserViewModel> {
        return await new Promise(async (resolve, reject) => {
            const agentData = await this.agentsRepository.findOne({domain});
            const userData = await this.usersRepository.findOne({id: agentData.agentUsers[0]});
            const user = new UserViewModel(userData);
            resolve(user);
        });
    }

    async checkExists(email: string): Promise<{ email: string }> {
        const user = await this.usersRepository.findOne({email});
        if (user) {
            return {email: user.email};
        } else {
            throw false;
        }
    }

    async getById(id: number): Promise<User> {
        return await this.usersRepository.findOne({id});
    }

    async addUser(user: any): Promise<User> {
        return await this.usersRepository.save(user);
    }

    async updateUser(id, user: any): Promise<any> {
        return await this.usersRepository.update({id}, user);
    }

    deleteUser(id: number): void {
        this.usersRepository.delete({id});
    }
}
