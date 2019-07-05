import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { REPOSITORIES } from '../types';
import { AgentListModel, AgentViewModel } from './agent.model';
import { UsersService } from '../users/users.service';
import * as _ from 'lodash';
import { UserModel } from '../users/user.model';

@Injectable()
export class AgentsService {
    constructor(@Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                private $usersService: UsersService) {
    }

    async getAll(): Promise<AgentListModel[]> {
        return await new Promise(async (resolve, reject) => {
            const agents = await this.agentsRepository.find();
            const usersData = await this.$usersService.getAll();

            const users = usersData.map(user => {
                return new UserModel(user);
            });

            resolve(agents.map(agentData => {
                const agent = new AgentListModel(agentData);
                agent.agentUsers = [];
                if (agentData.agentUsers && agentData.agentUsers.length > 0) {
                    agentData.agentUsers.forEach(userId => {
                        agent.agentUsers.push(new UserModel(_.find(users, {id: Number(userId)})));
                    });
                }
                return agent;
            }));
        });
    }

    async getById(id: number): Promise<AgentViewModel> {
        return await new Promise((resolve, reject) => {
            this.agentsRepository.findOne({id}).then(agentData => {
                this.$usersService.getAll().then(users => {
                    const agent = new AgentViewModel(agentData);
                    agent.agentUsers = [];
                    agent.agentSuppliers = [];
                    if (agentData.agentUsers && agentData.agentUsers.length > 0) {
                        agentData.agentUsers.forEach(userId => {
                            agent.agentUsers.push(new UserModel(_.find(users, {id: userId})));
                            agent.agentSuppliers.push(new UserModel(_.find(users, {id: userId})));
                        });
                    }
                    resolve(agent);
                });
            });
        });
    }

    async addAgent(agent: any): Promise<AgentViewModel> {
        return await new Promise((resolve, reject) => {
            this.agentsRepository.save(agent).then(agentData => {
                resolve(new AgentViewModel(agentData));
            });
        });
    }

    async updateAgent(id, agent: any): Promise<AgentViewModel> {
        return await new Promise((resolve, reject) => {
            this.agentsRepository.update({id}, agent).then(agentData => {
                resolve(new AgentViewModel(agentData));
            });
        });
    }
}
