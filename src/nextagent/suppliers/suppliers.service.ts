import { Inject, Injectable } from '@nestjs/common';
import { SupplierListModel, SupplierViewModel, SupplierAgentModel } from './supplier.model';
import { NotFoundException } from '../_exceptions';
import { REPOSITORIES } from '../constans';
import { In, Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import { User } from '../users/user.entity';
import { Agent } from '../agents/agent.entity';
import { AgentSupplier } from '../agent-suppliers/agent-supplier.entity';
import { UserModel } from '../users/user.model';
import { Agent1Model } from '../agents/agent.model';
import { UsersService } from '../users/users.service';
import { AgentSuppliersService } from '../agent-suppliers/agent-suppliers.service';
import * as _ from 'lodash';

@Injectable()
export class SuppliersService {
    constructor(@Inject(REPOSITORIES.suppliers)
                private readonly suppliersRepository: Repository<Supplier>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                @Inject(REPOSITORIES.agentSuppliers)
                private readonly agentSuppliersRepository: Repository<AgentSupplier>,
                @Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                private readonly $agentSuppliersService: AgentSuppliersService,
                private readonly $usersService: UsersService) {
    }

    async getAll(domain?: string): Promise<SupplierListModel[]> {
        let suppliersData;
        const agentSuppliersData = await this.agentSuppliersRepository.find();
        const agentsData = await this.agentsRepository.find();
        const usersData = await this.usersRepository.find();
        if ( domain ) {
            const agentData = await this.agentsFindOne({domain});
            const agentSuppliersDataFiltered = agentSuppliersData.filter(agentSupplier => agentSupplier.agent === agentData.id);
            const suppliersArray = agentSuppliersDataFiltered.map(agentSupplier => agentSupplier.supplier);
            suppliersData = await this.suppliersRepository.find({id: In(suppliersArray)});
        } else {
            suppliersData = await this.suppliersRepository.find();
        }
        return Promise.resolve(suppliersData.map(supplierData => {
            const supplier = new SupplierListModel(supplierData);
            supplier.supplierUsers = [];
            if (supplierData.supplierUsers && supplierData.supplierUsers.length > 0) {
                supplierData.supplierUsers.forEach(userId => {
                    supplier.supplierUsers.push(new UserModel(_.find(usersData, {id: Number(userId)})));
                });
            }

            supplier.agentSuppliers = [];
            if (supplierData.agentSuppliers && supplierData.agentSuppliers.length > 0) {
                supplierData.agentSuppliers.forEach(agentSupplierId => {
                    const agentSupplier = new SupplierAgentModel(_.find(agentSuppliersData, {id: Number(agentSupplierId)}));
                    agentSupplier.agent = new Agent1Model(_.find(agentsData, {id: Number(agentSupplier.agent)}));
                    supplier.agentSuppliers.push(agentSupplier);
                });
            }
            return supplier;
        }));
    }

    async getById(id: number): Promise<SupplierViewModel> {
        const agentSuppliersData = await this.agentSuppliersRepository.find();
        const usersData = await this.usersRepository.find();
        const agentsData = await this.agentsRepository.find();
        const supplierData = await this.suppliersFindOne({id});
        const supplier = new SupplierViewModel(supplierData);

        supplier.supplierUsers = [];
        if (supplierData.supplierUsers && supplierData.supplierUsers.length > 0) {
            supplierData.supplierUsers.forEach(userId => {
                supplier.supplierUsers.push(new UserModel(_.find(usersData, {id: Number(userId)})));
            });
        }

        supplier.agentSuppliers = [];
        if (supplierData.agentSuppliers && supplierData.agentSuppliers.length > 0) {
            supplierData.agentSuppliers.forEach(agentSupplierId => {
                const agentSupplier = new SupplierAgentModel(_.find(agentSuppliersData, {id: Number(agentSupplierId)}));
                agentSupplier.agent = new Agent1Model(_.find(agentsData, {id: Number(agentSupplier.agent)}));
                supplier.agentSuppliers.push(agentSupplier);
            });
        }
        return Promise.resolve(supplier);
    }

    async addSupplier(data: any): Promise<SupplierViewModel> {
        const entity = Object.assign(new Supplier(), data);
        const supplierData = await this.suppliersRepository.save(entity);
        return Promise.resolve(new SupplierViewModel(supplierData));
    }

    async updateSupplier(id, data: any): Promise<SupplierViewModel> {
        const entity = Object.assign(new Supplier(), data);
        await this.suppliersRepository.update({id}, entity);
        return await this.getById(id);
    }

    async deleteSupplier(id): Promise<any> {
        const supplierData = await this.suppliersFindOne({id});

        if ( supplierData.agentSuppliers && supplierData.agentSuppliers.length ) {
            await supplierData.agentSuppliers.forEach(async agentSupplierId => {
                await this.$agentSuppliersService.deleteAgentSupplierRelation(agentSupplierId);
            });
        }

        if ( supplierData.supplierUsers && supplierData.supplierUsers.length ) {
            await supplierData.supplierUsers.forEach(async userId => {
                await this.$usersService.deleteUser(userId);
            });
        }

        const res = await this.suppliersRepository.delete({id});
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('Supplier not found');
        }
    }

    async suppliersFindOne(condition): Promise<Supplier> {
        const supplierData = await this.suppliersRepository.findOne(condition);
        if (!supplierData) {
            throw new NotFoundException('Supplier not found');
        }
        return supplierData;
    }

    async agentsFindOne(condition): Promise<Agent> {
        const agentData = await this.agentsRepository.findOne(condition);
        if (!agentData) {
            throw new NotFoundException('Agent not found');
        }
        return agentData;
    }
}
