import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AgentsModule } from './agents/agents.module';
import { AgentUsersModule } from './agent-users/agent-users.module';
import { AgentSuppliersModule } from './agent-suppliers/agent-suppliers.module';
import { OwnersModule } from './owners/owners.module';
import { OwnerUsersModule } from './owner-users/owner-users.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SupplierUsersModule } from './supplier-users/supplier-users.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        AgentsModule,
        AgentUsersModule,
        AgentSuppliersModule,
        OwnersModule,
        OwnerUsersModule,
        SuppliersModule,
        SupplierUsersModule,
    ],
})
export class NextagentModule {
}
