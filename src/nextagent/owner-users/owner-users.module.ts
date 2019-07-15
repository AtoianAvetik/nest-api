import { Module } from '@nestjs/common';
import { OwnerUsersController } from './owner-users.controller';
import { OwnerUsersService } from './owner-users.service';
import { nextagentProviders } from '../nextagent.providers';

@Module({
    controllers: [
        OwnerUsersController,
    ],
    providers: [
        ...nextagentProviders,
        OwnerUsersService,
    ],
})
export class OwnerUsersModule {
}
