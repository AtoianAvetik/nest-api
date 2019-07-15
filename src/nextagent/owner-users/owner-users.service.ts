import { Inject, Injectable } from '@nestjs/common';
import { OwnerUserListModel, OwnerUserViewModel } from './owner-user.model';
import { REPOSITORIES, ROLES } from '../constans';
import { In, Repository } from 'typeorm';
import { User, Agent, Owner } from '../entities';
import { NotFoundException } from '../_exceptions';
import { OwnerModel } from '../owners/owner.model';
import * as _ from 'lodash';

@Injectable()
export class OwnerUsersService {
    constructor(@Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                @Inject(REPOSITORIES.owners)
                private readonly ownersRepository: Repository<Owner>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>) {
    }

    async getAll(domain: string): Promise<OwnerUserListModel[]> {
        const agentData = await this.agentsFindOne({domain});
        const ownersData = await this.ownersRepository.find({agent: agentData.id});
        const ownersArray = ownersData.map(ownerData => ownerData.id);
        const usersData = await this.usersRepository.find({owner: In(ownersArray)});
        return Promise.resolve(usersData.map(userData => {
            const user = new OwnerUserListModel(userData);
            if (userData.owner && ownersData.length) {
                user.owner = new OwnerModel(_.find(ownersData, {id: userData.owner}));
            }
            return user;
        }));
    }

    async getById(id: number, domain: string): Promise<OwnerUserViewModel> {
        const agentData = await this.agentsFindOne({domain});
        const ownersData = await this.ownersRepository.find({agent: agentData.id});
        const ownersArray = ownersData.map(ownerData => ownerData.id);

        const userData = await this.usersFindOne({id, owner: In(ownersArray)});
        const user = new OwnerUserViewModel(userData);

        if ( userData.owner ) {
            const ownerData = await this.ownersFindOne({id: userData.owner});
            user.owner = new OwnerModel(ownerData);
        }
        return Promise.resolve(user);
    }

    async addOwnerUser(data: any, domain: string): Promise<OwnerUserViewModel> {
        const agentData = await this.agentsFindOne({domain});
        const ownerData = await this.ownersFindOne({id: data.owner, agent: agentData.id});

        const entity = Object.assign(new User(), data, {role: ROLES.owner});
        const userData = await this.usersRepository.save(entity);
        const addedUser = new OwnerUserViewModel(userData);

        const ownerUsers = ownerData.ownerUsers || [];
        ownerUsers.push(userData.id);
        addedUser.owner = new OwnerModel(agentData);

        await this.ownersRepository.update(userData.owner, {ownerUsers});

        return Promise.resolve(addedUser);
    }

    async updateOwnerUser(id, data: any, domain: string): Promise<OwnerUserViewModel> {
        const agentData = await this.agentsFindOne({domain});
        const ownersData = await this.ownersRepository.find({agent: agentData.id});
        const ownersArray = ownersData.map(ownerData => ownerData.id);

        const entity = Object.assign(new Owner(), data);
        const res = await this.usersRepository.update({id, owner: In(ownersArray)}, entity);
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('User not found');
        }
        return await this.getById(id, domain);
    }

    async deleteOwnerUser(id, domain: string): Promise<any> {
        const agentData = await this.agentsFindOne({domain});
        const ownersData = await this.ownersRepository.find({agent: agentData.id});
        const ownersArray = ownersData.map(ownerData => ownerData.id);

        const res = await this.usersRepository.delete({id, owner: In(ownersArray)});
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('User not found');
        }
    }

    async passwordReset(id: number, domain: string): Promise<any> {
        const agentData = await this.agentsFindOne({domain});
        const ownersData = await this.ownersRepository.find({agent: agentData.id});
        const ownersArray = ownersData.map(ownerData => ownerData.id);

        // TODO password reset functionality

        return Promise.resolve();
    }

    async ownersFindOne(condition): Promise<Owner> {
        const ownerData = await this.ownersRepository.findOne(condition);
        if (!ownerData) {
            throw new NotFoundException('Owner not found');
        }
        return ownerData;
    }

    async usersFindOne(condition): Promise<User> {
        const userData = await this.usersRepository.findOne(condition);
        if (!userData) {
            throw new NotFoundException('User not found');
        }
        return userData;
    }

    async agentsFindOne(condition): Promise<Agent> {
        const agentData = await this.agentsRepository.findOne(condition);
        if (!agentData) {
            throw new NotFoundException('Agent not found');
        }
        return agentData;
    }
}
