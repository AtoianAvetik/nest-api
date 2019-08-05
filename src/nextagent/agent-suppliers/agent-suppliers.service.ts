import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Supplier, Agent, AgentSupplier } from '../entities';
import { Agent1Model } from '../agents/agent.model';
import { SupplierModel } from '../suppliers/supplier.model';
import { AgentSupplierViewModel } from './agent-supplier.model';
import { REPOSITORIES } from '../constans';
import { NotFoundException } from '../_exceptions';
import * as _ from 'lodash';

@Injectable()
export class AgentSuppliersService {
    constructor(@Inject(REPOSITORIES.suppliers)
                private readonly suppliersRepository: Repository<Supplier>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                @Inject(REPOSITORIES.agentSuppliers)
                private readonly agentSuppliersRepository: Repository<AgentSupplier>) {
    }

    async addAgentSupplierRelation(data: any): Promise<AgentSupplierViewModel> {
        const entity = Object.assign(new AgentSupplier(), data);
        const agentSupplierData = await this.agentSuppliersRepository.save(entity);
        const addedAgentSupplier = new AgentSupplierViewModel(agentSupplierData);

        const agentData = await this.agentsFindOne({id: agentSupplierData.agent});
        const supplierData = await this.suppliersFindOne({id: agentSupplierData.supplier});

        const agentSuppliersForAgent = agentData.agentSuppliers || [];
        const agentSuppliersForSupplier = supplierData.agentSuppliers || [];

        agentSuppliersForAgent.push(agentSupplierData.id);
        agentSuppliersForSupplier.push(agentSupplierData.id);

        addedAgentSupplier.agent = new Agent1Model(agentData);
        addedAgentSupplier.supplier = new SupplierModel(supplierData);

        await this.agentsRepository.update(agentSupplierData.agent, {agentSuppliers: agentSuppliersForAgent});
        await this.suppliersRepository.update(agentSupplierData.supplier, {agentSuppliers: agentSuppliersForSupplier});

        return Promise.resolve(addedAgentSupplier);
    }

    async deleteAgentSupplierRelation(id: number): Promise<any> {
        const agentSupplierData = await this.agentSuppliersFindOne({id});

        const agentData = await this.agentsFindOne({id: agentSupplierData.agent});
        const supplierData = await this.suppliersFindOne({id: agentSupplierData.supplier});

        const agentSuppliersForAgent = _.filter(agentData.agentSuppliers, o => o !== id.toString());
        const agentSuppliersForSupplier = _.filter(supplierData.agentSuppliers, o => o !== id.toString());

        await this.agentsRepository.update(agentSupplierData.agent, {agentSuppliers: agentSuppliersForAgent});
        await this.suppliersRepository.update(agentSupplierData.supplier, {agentSuppliers: agentSuppliersForSupplier});

        const res = await this.agentSuppliersRepository.delete({id});
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('AgentSupplier not found');
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

    async agentSuppliersFindOne(condition): Promise<AgentSupplier> {
        const agentSupplierData = await this.agentSuppliersRepository.findOne(condition);
        if (!agentSupplierData) {
            throw new NotFoundException('Agent not found');
        }
        return agentSupplierData;
    }
}
