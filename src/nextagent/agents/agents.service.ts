import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { REPOSITORIES, MODULE_UPLOADS_DEST } from '../constans';
import { AgentDomainModel, AgentListModel, AgentViewModel } from './agent.model';
import { ConfigService } from '../../_config/config.service';
import { NotFoundException } from '../_exceptions';
import * as _ from 'lodash';
import * as fs from 'fs';
import { User } from '../users/user.entity';
import { UserModel } from '../users/user.model';

@Injectable()
export class AgentsService {
    constructor(@Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                @Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                private $configService: ConfigService) {
    }

    async getAll(): Promise<AgentListModel[]> {
        const usersData = await this.usersRepository.find();
        const users = usersData.map(user => {
            return new UserModel(user);
        });
        const agentsData = await this.agentsRepository.find();
        return Promise.resolve(agentsData.map(agentData => {
            const agent = new AgentListModel(agentData);
            agent.agentUsers = [];
            if (agentData.agentUsers && agentData.agentUsers.length > 0) {
                agentData.agentUsers.forEach(userId => {
                    agent.agentUsers.push(_.find(users, {id: Number(userId)}));
                });
            }
            return agent;
        }));
    }

    async getById(id: number, domain?: string): Promise<AgentViewModel> {
        const usersData = await this.usersRepository.find();
        const users = usersData.map(user => {
            return new UserModel(user);
        });
        const agentData = await this.agentsFindOne({id});
        const agent = new AgentViewModel(agentData);

        // Only shows the Agent if it is the same Agent as the AgentUser and the X-Agent-Domain
        this.validateDomain(domain, agentData.domain);

        agent.agentUsers = [];
        agent.agentSuppliers = [];
        if (agentData.agentUsers && agentData.agentUsers.length > 0) {
            agentData.agentUsers.forEach(userId => {
                agent.agentUsers.push(_.find(users, {id: Number(userId)}));
                agent.agentSuppliers.push(_.find(users, {id: Number(userId)}));
            });
        }
        return Promise.resolve(agent);
    }

    async getByDomain(domain: string): Promise<AgentDomainModel> {
        const agentData = await this.agentsFindOne({domain});
        const agent = new AgentDomainModel(agentData);
        return Promise.resolve(agent);
    }

    async addAgent(data: any): Promise<AgentViewModel> {
        const entity = Object.assign(new Agent(), data);
        const agentData = await this.agentsRepository.save(entity);
        return Promise.resolve(new AgentViewModel(agentData));
    }

    async updateAgent(id, data: any, domain?: string): Promise<AgentViewModel> {
        const entity = Object.assign(new Agent(), data);

        // Can only update Agent if it is the same Agent as the X-Agent-Domain
        if (domain) {
            const agentData = await this.agentsFindOne({id});
            this.validateDomain(domain, agentData.domain);
        }
        await this.agentsRepository.update({id}, entity);
        return await this.getById(id);
    }

    async deleteAgent(id: number): Promise<any> {
        const res = await this.agentsRepository.delete({id});
        if (res.affected === 0) {
            throw new NotFoundException('Agent not found');
        }
    }

    async deleteLoginImage(id: number, domain?: string): Promise<any> {
        const agentData = await this.agentsFindOne({id});
        // Can only delete Agent image if it is the same Agent as the X-Agent-Domain
        this.validateDomain(domain, agentData.domain);

        const loginImagePath = agentData.loginImageUrl ? (this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/' + agentData.loginImageUrl.split('/').pop()) : '';
        const loginImageThumbnailPath = agentData.loginImageUrl ? (this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/thumbnails/' + agentData.loginImageThumbnailUrl.split('/').pop()) : '';
        await this.deleteImage(loginImagePath);
        await this.deleteImage(loginImageThumbnailPath);
        return Promise.resolve();
    }

    async deleteLogoImage(id: number, domain?: string): Promise<any> {
        const agentData = await this.agentsFindOne({id});
        // Can only delete Agent image if it is the same Agent as the X-Agent-Domain
        this.validateDomain(domain, agentData.domain);

        const logoImagePath = agentData.logoImageUrl ? (this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/' + agentData.logoImageUrl.split('/').pop()) : '';
        const logoImageThumbnailPath = agentData.logoImageUrl ? (this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/thumbnails/' + agentData.logoImageThumbnailUrl.split('/').pop()) : '';
        await this.deleteImage(logoImagePath);
        await this.deleteImage(logoImageThumbnailPath);
        return Promise.resolve();
    }

    public validateDomain(domain, domainCandidate) {
        if (domain && domainCandidate !== domain) {
            throw new BadRequestException({code: HttpStatus.BAD_REQUEST, message: 'You do not have access to this action.'});
        }
    }

    async deleteImage(path): Promise<any> {
        try {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        } catch (err) {
            throw new NotFoundException('Image not found');
        }
    }

    async agentsFindOne(condition): Promise<Agent> {
        const agentData = await this.agentsRepository.findOne(condition);
        if (!agentData) {
            throw new NotFoundException('Agent not found');
        }
        return agentData;
    }
}
