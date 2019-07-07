import { UserModel } from '../users/user.model';

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
    agentSuppliers: UserModel[];
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
