import { Module } from '@nestjs/common';
import { DatabaseModule } from '../_database/database.module';
import { nextagentProviders } from './nextagent.providers';
import { AgentsController } from './agents/agents.controller';
import { AgentsService } from './agents/agents.service';
import { AgentUsersService } from './agent-users/agent-users.service';
import { AgentUsersController } from './agent-users/agent-users.controller';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [
        UsersController,
        AgentsController,
        AgentUsersController,
    ],
    providers: [
        ...nextagentProviders,
        UsersService,
        AgentsService,
        AgentUsersService,
    ],
})
export class NextagentModule {
}
