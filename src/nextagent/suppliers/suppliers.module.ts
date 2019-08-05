import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { nextagentProviders } from '../nextagent.providers';
import { AgentSuppliersService } from '../agent-suppliers/agent-suppliers.service';
import { UsersService } from '../users/users.service';

@Module({
    controllers: [
        SuppliersController,
    ],
    providers: [
        ...nextagentProviders,
        SuppliersService,
        AgentSuppliersService,
        UsersService,
    ],
    exports: [
        SuppliersService,
    ],
})
export class SuppliersModule {
}
