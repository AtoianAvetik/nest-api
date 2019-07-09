import { Module } from '@nestjs/common';
import { nextagentProviders } from '../nextagent.providers';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { UsersService } from '../users/users.service';

@Module({
    controllers: [
        AgentsController,
    ],
    providers: [
        ...nextagentProviders,
        AgentsService,
        UsersService,
    ],
})
export class AgentsModule {}
