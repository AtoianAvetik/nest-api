import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { REPOSITORIES } from '../types';
import { User } from '../entities';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
    constructor(@Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>) {
    }

    async getAll(): Promise<UserModel[]> {
        return await new Promise(async (resolve, reject) => {
            const users = await this.usersRepository.find();

            resolve(users.map(user => {
                return new UserModel(user);
            }));
        });
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
