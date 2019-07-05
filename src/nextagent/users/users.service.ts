import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { REPOSITORIES } from '../types';
import { User } from '../entities';

@Injectable()
export class UsersService {
    constructor(@Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>) {
    }

    async getAll(): Promise<User[]> {
        return await this.usersRepository.find();
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

    deleteUser(user: any): void {
        this.usersRepository.remove(user);
    }
}
