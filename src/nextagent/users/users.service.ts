import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { REPOSITORIES } from '../types';
import { Agent, User } from '../entities';
import { UserModel, UserViewModel } from './user.model';

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

    async getById(id: number): Promise<UserViewModel> {
        return await new Promise(async (resolve, reject) => {
            const userData = await this.usersRepository.findOne({id});
            const user = new UserViewModel(userData);
            resolve(user);
        });
    }

    async getByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({email});
    }

    async addUser(data: any): Promise<UserViewModel> {
        return await new Promise(async (resolve, reject) => {
            const userData = await this.usersRepository.save(data);
            const user = new UserViewModel(userData);
            resolve(user);
        });
    }

    async updateUser(id, user: any): Promise<UserViewModel> {
        await this.usersRepository.update({id}, user);
        return await this.getById(id);
    }

    deleteUser(id: number): void {
        this.usersRepository.delete({id});
    }
}
