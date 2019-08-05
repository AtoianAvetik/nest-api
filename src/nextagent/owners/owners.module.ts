import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { nextagentProviders } from '../nextagent.providers';
import { UsersService } from '../users/users.service';

@Module({
    controllers: [
        OwnersController,
    ],
    providers: [
        ...nextagentProviders,
        OwnersService,
        UsersService,
    ],
    exports: [
        OwnersService,
    ],
})
export class OwnersModule {
}
