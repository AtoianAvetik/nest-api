import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AgentsModule } from './agents/agents.module';
import { AgentUsersModule } from './agent-users/agent-users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        AgentsModule,
        AgentUsersModule,
    ],
})
export class NextagentModule {
}
