import { Injectable } from '@nestjs/common';
import { AgentUserListModel, AgentUserViewModel } from './agent-user.model';
import { AgentModel } from '../agents/agent.model';
import { AgentsService } from '../agents/agents.service';
import { UsersService } from '../users/users.service';
import * as _ from 'lodash';

@Injectable()
export class AgentUsersService {
    constructor(private $usersService: UsersService,
                private $agentsService: AgentsService) {
    }

    async getAll(): Promise<AgentUserListModel[]> {
        return await new Promise(async (resolve, reject) => {
            const users = await this.$usersService.getAll();
            const agents = await this.$agentsService.getAll();

            resolve(users.map(userData => {
                const user = new AgentUserListModel(userData);

                if ( userData.agent && agents.length ) {
                    user.agent = new AgentModel(_.find(agents, {id: userData.agent}));
                }

                return user;
            }));
        });
    }

    async getById(id: number): Promise<AgentUserViewModel> {
        return await new Promise(async (resolve, reject) => {
            const userData = await this.$usersService.getById(id);
            const agents = await this.$agentsService.getAll();
            const user = new AgentUserViewModel(userData);

            if ( userData.agent ) {
                user.agent = new AgentModel(_.find(agents, {id: userData.agent}));
            }

            resolve(user);
        });
    }

    async addAgentUser(user: any): Promise<AgentUserViewModel> {
        return await new Promise(async (resolve, reject) => {
            const userData = await this.$usersService.addUser(user);
            const agents = await this.$agentsService.getAll();
            const addedUser = new AgentUserViewModel(userData);

            if ( userData.agent ) {
                addedUser.agent = new AgentModel(_.find(agents, {id: userData.agent}));
                this.$agentsService.updateAgent(userData.agent, {agentUsers: [userData.id]});
            }

            resolve(addedUser);
        });
    }

    async updateAgentUser(user: any): Promise<AgentUserViewModel> {
        return await new Promise(async (resolve, reject) => {
            const userData = await this.$usersService.updateUser(user.id, user);
            const agents = await this.$agentsService.getAll();
            const addedUser = new AgentUserViewModel(userData);

            if ( userData.agent ) {
                addedUser.agent = new AgentModel(_.find(agents, {id: userData.agent}));
            }

            resolve(addedUser);
        });
    }

    deleteAgentUser(user: any): void {
        this.$usersService.deleteUser(user);
    }
}
