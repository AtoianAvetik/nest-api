import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { REPOSITORIES } from '../types';
import { AgentDomainModel, AgentListModel, AgentViewModel } from './agent.model';
import { UsersService } from '../users/users.service';
import * as _ from 'lodash';

@Injectable()
export class AgentsService {
    constructor(@Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                private $usersService: UsersService) {
    }

    async getAll(): Promise<AgentListModel[]> {
        return await new Promise(async (resolve, reject) => {
            const users = await this.$usersService.getAll();
            const agents = await this.agentsRepository.find();
            resolve(agents.map(agentData => {
                const agent = new AgentListModel(agentData);
                agent.agentUsers = [];
                if (agentData.agentUsers && agentData.agentUsers.length > 0) {
                    agentData.agentUsers.forEach(userId => {
                        agent.agentUsers.push(_.find(users, {id: Number(userId)}));
                    });
                }
                return agent;
            }));
        });
    }

    async getById(id: number): Promise<AgentViewModel> {
        return await new Promise(async (resolve, reject) => {
            const users = await this.$usersService.getAll();
            const agentData = await this.agentsRepository.findOne({id});
            const agent = new AgentViewModel(agentData);

            agent.agentUsers = [];
            agent.agentSuppliers = [];
            if (agentData.agentUsers && agentData.agentUsers.length > 0) {
                agentData.agentUsers.forEach(userId => {
                    agent.agentUsers.push(_.find(users, {id: Number(userId)}));
                    agent.agentSuppliers.push(_.find(users, {id: Number(userId)}));
                });
            }
            resolve(agent);
        });
    }

    async getByDomain(domain: string): Promise<AgentDomainModel> {
        return await new Promise(async (resolve, reject) => {
            const agentData = await this.agentsRepository.findOne({domain});
            const agent = new AgentDomainModel(agentData);
            resolve(agent);
        });
    }

    async addAgent(data: any): Promise<AgentViewModel> {
        return await new Promise((resolve, reject) => {
            const entity = Object.assign(new Agent(), data);
            this.agentsRepository.save(entity).then(agentData => {
                resolve(new AgentViewModel(agentData));
            });
        });
    }

    async updateAgent(id, data: any): Promise<AgentViewModel> {
        const entity = Object.assign(new Agent(), data);
        await this.agentsRepository.update({id}, entity);
        return await this.getById(id);
    }

    async updateAgentTheming(id, theming: any): Promise<AgentViewModel> {
        const entity = Object.assign(new Agent(), theming);
        await this.agentsRepository.update({id}, entity);
        return await this.getById(id);
    }

    deleteAgent(id: number): void {
        this.agentsRepository.delete({id});
    }
}
