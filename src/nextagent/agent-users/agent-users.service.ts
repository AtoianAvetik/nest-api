import { Inject, Injectable } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { AgentUserListModel, AgentUserViewModel } from './agent-user.model';
import { AgentModel } from '../agents/agent.model';
import { REPOSITORIES } from '../types';
import { Agent } from '../agents/agent.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import * as _ from 'lodash';

@Injectable()
export class AgentUsersService {
    constructor(@Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                private $usersService: UsersService) {
    }

    async getAll(): Promise<AgentUserListModel[]> {
        return await new Promise(async (resolve, reject) => {
            const users = await this.usersRepository.find({agent: Not(null)});
            const agents = await this.agentsRepository.find();

            resolve(users.map(userData => {
                const user = new AgentUserListModel(userData);

                if ( user.agent && agents.length ) {
                    user.agent = new AgentModel(_.find(agents, {id: user.agent}));
                }

                return user;
            }));
        });
    }

    async getById(id: number): Promise<AgentUserViewModel> {
        return await new Promise(async (resolve, reject) => {
            const userData = await this.$usersService.getById(id);
            const user = new AgentUserViewModel(userData);

            if ( userData.agent ) {
                const agentData = await this.agentsRepository.findOne({id: userData.agent});
                user.agent = new AgentModel(agentData);
            }

            resolve(user);
        });
    }

    async addAgentUser(user: any): Promise<AgentUserViewModel> {
        return await new Promise(async (resolve, reject) => {
            const userData = await this.$usersService.addUser(user);
            const addedUser = new AgentUserViewModel(userData);

            if ( userData.agent ) {
                const agentData = await this.agentsRepository.findOne({id: userData.agent});
                const agentUsers = agentData.agentUsers || [];
                agentUsers.push(userData.id);
                addedUser.agent = new AgentModel(agentData);

                await this.agentsRepository.update(userData.agent, {agentUsers});
            }

            resolve(addedUser);
        });
    }

    async updateAgentUser(id, user: any): Promise<AgentUserViewModel> {
        await this.$usersService.updateUser(id, user);
        return await this.getById(id);
    }

    async deleteAgentUser(id: number): Promise<any> {
        const userData = await this.usersRepository.findOne({id});
        const agentData = await this.agentsRepository.findOne({id: userData.agent});
        const agentUsers = _.filter(agentData.agentUsers, o => o !== id.toString() );
        await this.agentsRepository.update(userData.agent, {agentUsers});
        await this.$usersService.deleteUser(id);
    }
}
