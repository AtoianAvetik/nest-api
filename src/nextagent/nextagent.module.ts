import { Module } from '@nestjs/common';
import { DatabaseModule } from '../_database/database.module';
import { nextagentProviders } from './nextagent.providers';
import { AgentsController } from './agents/agents.controller';
import { AgentsService } from './agents/agents.service';
import { AgentUsersService } from './agent-users/agent-users.service';
import { AgentUsersController } from './agent-users/agent-users.controller';
import { UsersService } from './users/users.service';

@Module({
    imports: [DatabaseModule],
    controllers: [
        AgentsController,
        AgentUsersController,
    ],
    providers: [
        ...nextagentProviders,
        AgentsService,
        AgentUsersService,
        UsersService,
    ],
})
export class NextagentModule {
}
