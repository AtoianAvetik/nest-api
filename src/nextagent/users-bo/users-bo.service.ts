import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { REPOSITORIES } from '../types';
import { UserBO } from '../entities';
import { UserBOModel } from './user-bo.model';

@Injectable()
export class UsersBOService {
    constructor(@Inject(REPOSITORIES.usersBO)
                private readonly usersBORepository: Repository<UserBO>) {
    }

    async getAll(): Promise<UserBOModel[]> {
        return await new Promise(async (resolve, reject) => {
            const users = await this.usersBORepository.find();

            resolve(users.map(user => {
                return new UserBOModel(user);
            }));
        });
    }

    async checkExists(email: string): Promise<{ email: string }> {
        const user = await this.usersBORepository.findOne({email});
        if (user) {
            return {email: user.email};
        } else {
            throw false;
        }
    }

    async getById(id: number): Promise<UserBO> {
        return await this.usersBORepository.findOne({id});
    }

    async getByEmail(email: string): Promise<UserBO> {
        return await this.usersBORepository.findOne({email});
    }

    async addUser(user: any): Promise<UserBO> {
        return await this.usersBORepository.save(user);
    }

    async updateUser(id, user: any): Promise<any> {
        return await this.usersBORepository.update({id}, user);
    }

    deleteUser(id: number): void {
        this.usersBORepository.delete({id});
    }
}
