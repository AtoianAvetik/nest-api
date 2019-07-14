import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository, Not, IsNull } from 'typeorm';
import { AgentUserListModel, AgentUserViewModel } from './agent-user.model';
import { AgentModel } from '../agents/agent.model';
import { REPOSITORIES, ROLES } from '../constans';
import { Agent } from '../agents/agent.entity';
import { User } from '../users/user.entity';
import * as _ from 'lodash';
import { NotFoundException } from '../_exceptions';

@Injectable()
export class AgentUsersService {
    constructor(@Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>) {
    }

    async getAll(): Promise<AgentUserListModel[]> {
        const usersData = await this.usersRepository.find({agent: Not(IsNull())});
        const agentsData = await this.agentsRepository.find();
        return Promise.resolve(usersData.map(userData => {
            const user = new AgentUserListModel(userData);
            if (user.agent && agentsData.length) {
                user.agent = new AgentModel(_.find(agentsData, {id: user.agent}));
            }
            return user;
        }));
    }

    async getById(id: number, domain?: string): Promise<AgentUserViewModel> {
        const userData = await this.usersFindOne({id});
        const user = new AgentUserViewModel(userData);

        if (userData.agent) {
            const agentData = await this.agentsFindOne({id: userData.agent});
            user.agent = new AgentModel(agentData);

            // Only shows the Agent if it is the same Agent as the AgentUser and the X-Agent-Domain
            this.validateDomain(domain, agentData.domain);
        }
        return Promise.resolve(user);
    }

    async addAgentUser(data: any): Promise<AgentUserViewModel> {
        const entity = Object.assign(new User(), data, {role: ROLES.agent});
        const userData = await this.usersRepository.save(entity);
        const addedUser = new AgentUserViewModel(userData);

        if (userData.agent) {
            const agentData = await this.agentsFindOne({id: userData.agent});
            const agentUsers = agentData.agentUsers || [];
            agentUsers.push(userData.id);
            addedUser.agent = new AgentModel(agentData);

            await this.agentsRepository.update(userData.agent, {agentUsers});
        }
        return Promise.resolve(addedUser);
    }

    async updateAgentUser(id, data: any, domain?: string): Promise<AgentUserViewModel> {
        const entity = Object.assign(new User(), data);
        // Can only update Agent if it is the same Agent as the X-Agent-Domain
        if (domain) {
            const userData = await this.usersFindOne({id});
            const agentData = await this.agentsFindOne({id: userData.agent});
            this.validateDomain(domain, agentData.domain);
        }
        await this.usersRepository.update({id}, entity);
        return await this.getById(id);
    }

    async deleteAgentUser(id: number): Promise<any> {
        const userData = await this.usersFindOne({id});
        const agentData = await this.agentsFindOne({id: userData.agent});
        const agentUsers = _.filter(agentData.agentUsers, o => o !== id.toString());
        await this.agentsRepository.update(userData.agent, {agentUsers});
        const res = await this.usersRepository.delete({id});
        if (res.affected === 0) {
            throw new NotFoundException('User not found');
        }
    }

    public validateDomain(domain, domainCandidate) {
        if (domain && domainCandidate !== domain) {
            throw new BadRequestException({code: HttpStatus.BAD_REQUEST, message: 'You do not have access to this action.'});
        }
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
