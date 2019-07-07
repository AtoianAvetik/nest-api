import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../_database/database.module';
import { nextagentProviders } from './nextagent.providers';
import { AgentsController } from './agents/agents.controller';
import { AgentsService } from './agents/agents.service';
import { AgentUsersService } from './agent-users/agent-users.service';
import { AgentUsersController } from './agent-users/agent-users.controller';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: 'secret12356789',
        }),
    ],
    controllers: [
        AuthController,
        UsersController,
        AgentsController,
        AgentUsersController,
    ],
    providers: [
        ...nextagentProviders,
        AuthService,
        UsersService,
        AgentsService,
        AgentUsersService,
    ],
})
export class NextagentModule {
}
