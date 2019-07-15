import { Module } from '@nestjs/common';
import { SupplierUsersController } from './supplier-users.controller';
import { SupplierUsersService } from './supplier-users.service';

@Module({
    controllers: [SupplierUsersController],
    providers: [SupplierUsersService],
})
export class SupplierUsersModule {
}
