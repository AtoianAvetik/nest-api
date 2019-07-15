import { Module } from '@nestjs/common';
import { OwnerUsersController } from './owner-users.controller';
import { OwnerUsersService } from './owner-users.service';

@Module({
    controllers: [OwnerUsersController],
    providers: [OwnerUsersService],
})
export class OwnerUsersModule {
}
