import { UserModel } from '../users/user.model';
import { SupplierModel } from '../suppliers/supplier.model';

export class AgentSupplierModel {
    id: number;
    supplier: SupplierModel;

    constructor(data) {
        this.id = data.id;
        this.supplier = data.supplier;
    }
}

export class Agent1Model {
    id: number;
    companyName: string;

    constructor(data) {
        this.id = data.id;
        this.companyName = data.companyName;
    }
}

export class AgentModel {
    id: number;
    companyName: string;
    domain: string;

    constructor(data) {
        this.id = data.id;
        this.companyName = data.companyName;
        this.domain = data.domain;
    }
}

export class AgentDomainModel {
    companyName: string;
    domain: string;
    loginImageUrl: string;
    loginImageThumbnailUrl: string;
    logoImageUrl: string;
    logoImageThumbnailUrl: string;
    primaryColor: string;
    secondaryColor: string;

    constructor(data) {
        this.companyName = data.companyName;
        this.domain = data.domain;
        this.loginImageUrl = data.loginImageUrl;
        this.loginImageThumbnailUrl = data.loginImageThumbnailUrl;
        this.logoImageUrl = data.logoImageUrl;
        this.logoImageThumbnailUrl = data.logoImageThumbnailUrl;
        this.primaryColor = data.primaryColor;
        this.secondaryColor = data.secondaryColor;
    }
}

export class AgentListModel extends AgentModel {
    agentUsers: UserModel[];

    constructor(data) {
        super(data);
        this.agentUsers = data.agentUsers || [];
    }
}

export class AgentViewModel extends AgentListModel {
    loginImageUrl: string;
    loginImageThumbnailUrl: string;
    logoImageUrl: string;
    logoImageThumbnailUrl: string;
    primaryColor: string;
    secondaryColor: string;
    agentSuppliers: AgentSupplierModel[];
    createdAt: Date;

    constructor(data) {
        super(data);
        this.loginImageUrl = data.loginImageUrl;
        this.loginImageThumbnailUrl = data.loginImageThumbnailUrl;
        this.logoImageUrl = data.logoImageUrl;
        this.logoImageThumbnailUrl = data.logoImageThumbnailUrl;
        this.primaryColor = data.primaryColor;
        this.secondaryColor = data.secondaryColor;
        this.agentSuppliers = data.agentSuppliers || [];
        this.createdAt = data.createdAt;
    }
}
