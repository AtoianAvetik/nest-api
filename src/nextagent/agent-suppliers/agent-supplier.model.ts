import { Agent1Model } from '../agents/agent.model';
import { SupplierModel } from '../suppliers/supplier.model';

export class AgentSupplierListModel  {
    id: number;
    agent: Agent1Model;
    supplier: SupplierModel;

    constructor(data) {
        this.id = data.id;
        this.agent = data.agent;
        this.supplier = data.supplier;
    }
}

export class AgentSupplierViewModel extends AgentSupplierListModel{
    createdAt: Date;

    constructor(data) {
        super(data);
        this.createdAt = data.createdAt;
    }
}
