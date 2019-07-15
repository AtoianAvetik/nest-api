import { Module } from '@nestjs/common';
import { nextagentProviders } from '../nextagent.providers';
import { AgentUsersController } from './agent-users.controller';
import { AgentUsersService } from './agent-users.service';

@Module({
    controllers: [
        AgentUsersController,
    ],
    providers: [
        ...nextagentProviders,
        AgentUsersService,
    ],
})
export class AgentUsersModule {
}
