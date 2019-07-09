// this is for swagger

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AgentsModule } from './agents/agents.module';
import { AgentUsersModule } from './agent-users/agent-users.module';

export const MODULES = [
    AuthModule,
    UsersModule,
    AgentsModule,
    AgentUsersModule,
];
