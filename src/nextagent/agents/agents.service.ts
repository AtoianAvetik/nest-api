import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { REPOSITORIES, MODULE_UPLOADS_DEST } from '../constans';
import { AgentDomainModel, AgentListModel, AgentSupplierModel, AgentViewModel } from './agent.model';
import { ConfigService } from '../../_config/config.service';
import { NotFoundException } from '../_exceptions';
import * as _ from 'lodash';
import * as fs from 'fs';
import { User } from '../users/user.entity';
import { UserModel } from '../users/user.model';
import { AgentSupplier } from '../agent-suppliers/agent-supplier.entity';
import { UsersService } from '../users/users.service';
import { AgentSuppliersService } from '../agent-suppliers/agent-suppliers.service';

@Injectable()
export class AgentsService {
    constructor(@Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                @Inject(REPOSITORIES.agentSuppliers)
                private readonly agentSuppliersRepository: Repository<AgentSupplier>,
                @Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                private $usersService: UsersService,
                private $agentSuppliersService: AgentSuppliersService,
                private $configService: ConfigService) {
    }

    async getAll(): Promise<AgentListModel[]> {
        const usersData = await this.usersRepository.find();
        const agentsData = await this.agentsRepository.find();
        return Promise.resolve(agentsData.map(agentData => {
            const agent = new AgentListModel(agentData);
            agent.agentUsers = [];
            if (agentData.agentUsers && agentData.agentUsers.length > 0) {
                agentData.agentUsers.forEach(userId => {
                    agent.agentUsers.push(new UserModel(_.find(usersData, {id: Number(userId)})));
                });
            }
            return agent;
        }));
    }

    async getById(id: number, domain?: string): Promise<AgentViewModel> {
        const usersData = await this.usersRepository.find();
        const agentSuppliersData = await this.agentSuppliersRepository.find();
        const agentData = await this.agentsFindOne({id});
        const agent = new AgentViewModel(agentData);

        // Only shows the Agent if it is the same Agent as the AgentUser and the X-Agent-Domain
        await this.validateDomain(domain, agentData.domain);

        agent.agentUsers = [];
        if (agentData.agentUsers && agentData.agentUsers.length > 0) {
            agentData.agentUsers.forEach(userId => {
                agent.agentUsers.push(new UserModel(_.find(usersData, {id: Number(userId)})));
            });
        }

        agent.agentSuppliers = [];
        if (agentData.agentSuppliers && agentData.agentSuppliers.length > 0) {
            agentData.agentSuppliers.forEach(agentSupplierId => {
                agent.agentSuppliers.push(new AgentSupplierModel(_.find(agentSuppliersData, {id: Number(agentSupplierId)})));
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
            await this.validateDomain(domain, agentData.domain);
        }
        await this.agentsRepository.update({id}, entity);
        return await this.getById(id);
    }

    async deleteAgent(id: number): Promise<any> {
        const agentData = await this.agentsFindOne({id});
        console.log(agentData);
        if ( agentData.agentUsers && agentData.agentUsers.length ) {
            await agentData.agentUsers.forEach(async userId => {
                await this.$usersService.deleteUser(userId);
            });
        }
        console.log(1);

        if ( agentData.agentSuppliers && agentData.agentSuppliers.length ) {
            await agentData.agentSuppliers.forEach(async agentSupplierId => {
                console.log(2);
                await this.$agentSuppliersService.deleteAgentSupplierRelation(agentSupplierId);
            });
        }

        console.log(4);
        const res = await this.agentsRepository.delete({id});
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('Agent not found');
        }
    }

    async deleteLoginImage(id: number, domain?: string): Promise<any> {
        const agentData = await this.agentsFindOne({id});
        // Can only delete Agent image if it is the same Agent as the X-Agent-Domain
        await this.validateDomain(domain, agentData.domain);

        const loginImagePath = agentData.loginImageUrl ? (this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/' + agentData.loginImageUrl.split('/').pop()) : '';
        const loginImageThumbnailPath = agentData.loginImageUrl ? (this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/thumbnails/' + agentData.loginImageThumbnailUrl.split('/').pop()) : '';
        await this.deleteImage(loginImagePath);
        await this.deleteImage(loginImageThumbnailPath);
        return Promise.resolve();
    }

    async deleteLogoImage(id: number, domain?: string): Promise<any> {
        const agentData = await this.agentsFindOne({id});
        // Can only delete Agent image if it is the same Agent as the X-Agent-Domain
        await this.validateDomain(domain, agentData.domain);

        const logoImagePath = agentData.logoImageUrl ? (this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/' + agentData.logoImageUrl.split('/').pop()) : '';
        const logoImageThumbnailPath = agentData.logoImageUrl ? (this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/thumbnails/' + agentData.logoImageThumbnailUrl.split('/').pop()) : '';
        await this.deleteImage(logoImagePath);
        await this.deleteImage(logoImageThumbnailPath);
        return Promise.resolve();
    }

    async validateDomain(domain, domainCandidate): Promise<any> {
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
