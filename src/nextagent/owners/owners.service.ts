import { Inject, Injectable } from '@nestjs/common';
import { OwnerListModel, OwnerViewModel } from './owner.model';
import { REPOSITORIES } from '../constans';
import { Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { Agent, User } from '../entities';
import { NotFoundException } from '../_exceptions';
import { UserModel } from '../users/user.model';
import * as _ from 'lodash';

@Injectable()
export class OwnersService {
    constructor(@Inject(REPOSITORIES.owners)
                private readonly ownersRepository: Repository<Owner>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                @Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>) {
    }

    async getAll(domain: string): Promise<OwnerListModel[]> {
        const usersData = await this.usersRepository.find();
        const users = usersData.map(user => {
            return new UserModel(user);
        });
        const agentData = await this.agentsFindOne({domain});
        const ownersData = await this.ownersRepository.find({agent: agentData.id});
        return Promise.resolve(ownersData.map(ownerData => {
            const owner = new OwnerListModel(ownerData);
            owner.ownerUsers = [];
            if (ownerData.ownerUsers && ownerData.ownerUsers.length > 0) {
                ownerData.ownerUsers.forEach(userId => {
                    owner.ownerUsers.push(_.find(users, {id: Number(userId)}));
                });
            }
            return owner;
        }));
    }

    async getById(id: number, domain: string): Promise<OwnerViewModel> {
        const agentData = await this.agentsFindOne({domain});
        const usersData = await this.usersRepository.find();
        const users = usersData.map(user => {
            return new UserModel(user);
        });
        const ownerData = await this.ownersFindOne({id, agent: agentData.id});
        const owner = new OwnerViewModel(ownerData);
        owner.ownerUsers = [];
        if (ownerData.ownerUsers && ownerData.ownerUsers.length > 0) {
            ownerData.ownerUsers.forEach(userId => {
                owner.ownerUsers.push(_.find(users, {id: Number(userId)}));
            });
        }
        return Promise.resolve(owner);
    }

    async addOwner(data: any, domain: string): Promise<OwnerViewModel> {
        const agentData = await this.agentsFindOne({domain});
        const entity = Object.assign(new Owner(), data, {agent: agentData.id});
        const ownerData = await this.ownersRepository.save(entity);
        return Promise.resolve(new OwnerViewModel(ownerData));
    }

    async updateOwner(id, data: any, domain: string): Promise<OwnerViewModel> {
        const agentData = await this.agentsFindOne({domain});
        const entity = Object.assign(new Owner(), data);
        const res = await this.ownersRepository.update({id, agent: agentData.id}, entity);
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('Owner not found');
        }
        return this.getById(id, domain);
    }

    async deleteOwner(id, domain: string): Promise<any> {
        const agentData = await this.agentsFindOne({domain});
        const res = await this.ownersRepository.delete({id, agent: agentData.id});
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('Owner not found');
        }
    }

    async ownersFindOne(condition): Promise<Owner> {
        const ownerData = await this.ownersRepository.findOne(condition);
        if (!ownerData) {
            throw new NotFoundException('Owner not found');
        }
        return ownerData;
    }

    async agentsFindOne(condition): Promise<Agent> {
        const agentData = await this.agentsRepository.findOne(condition);
        if (!agentData) {
            throw new NotFoundException('Agent not found');
        }
        return agentData;
    }
}
