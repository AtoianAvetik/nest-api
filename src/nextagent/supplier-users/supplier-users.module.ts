import { Module } from '@nestjs/common';
import { SupplierUsersController } from './supplier-users.controller';
import { SupplierUsersService } from './supplier-users.service';
import { nextagentProviders } from '../nextagent.providers';

@Module({
    controllers: [
        SupplierUsersController,
    ],
    providers: [
        ...nextagentProviders,
        SupplierUsersService,
    ],
})
export class SupplierUsersModule {
}
