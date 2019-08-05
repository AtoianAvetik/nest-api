import { UserModel } from '../users/user.model';
import { SupplierProductModel } from '../supplier-products/supplier-product.model';
import { Agent1Model } from '../agents/agent.model';

export class SupplierAgentModel {
    id: number;
    agent: Agent1Model;

    constructor(data) {
        this.id = data.id;
        this.agent = data.agent;
    }
}

export class SupplierModel {
    id: number;
    name: string;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }
}

export class SupplierListModel extends SupplierModel {
    email: string;
    visibleForAllAgents: boolean;
    agentSuppliers: SupplierAgentModel[];
    supplierUsers: UserModel[];

    constructor(data) {
        super(data);
        this.email = data.email;
        this.visibleForAllAgents = data.visibleForAllAgents;
        this.agentSuppliers = data.agentSuppliers || [];
        this.supplierUsers = data.supplierUsers || [];
    }
}

export class SupplierViewModel extends SupplierListModel {
    supplierProducts: SupplierProductModel;
    createdAt: Date;

    constructor(data) {
        super(data);
        this.supplierProducts = data.supplierProducts || [];
        this.createdAt = data.createdAt;
    }
}
