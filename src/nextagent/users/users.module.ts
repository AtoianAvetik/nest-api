import { Module } from '@nestjs/common';
import { nextagentProviders } from '../nextagent.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [
        UsersController,
    ],
    providers: [
        ...nextagentProviders,
        UsersService,
    ],
    exports: [
        UsersService,
    ],
})
export class UsersModule {}
