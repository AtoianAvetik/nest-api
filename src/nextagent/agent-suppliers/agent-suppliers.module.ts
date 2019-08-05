import { Module } from '@nestjs/common';
import { nextagentProviders } from '../nextagent.providers';
import { AgentSuppliersController } from './agent-suppliers.controller';
import { AgentSuppliersService } from './agent-suppliers.service';

@Module({
    controllers: [
        AgentSuppliersController,
    ],
    providers: [
        ...nextagentProviders,
        AgentSuppliersService,
    ],
    exports: [
        AgentSuppliersService,
    ],
})
export class AgentSuppliersModule {
}
