import { AgentModel } from '../agents/agent.model';
import { UserModel, UserViewModel } from '../users/user.model';

export class AgentUserListModel extends UserModel {
    agent: AgentModel;

    constructor(data) {
        super(data);
    }
}

export class AgentUserViewModel extends UserViewModel {
    agent: AgentModel;

    constructor(data) {
        super(data);
    }
}
