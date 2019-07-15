import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { nextagentProviders } from '../nextagent.providers';

@Module({
    controllers: [
        OwnersController,
    ],
    providers: [
        ...nextagentProviders,
        OwnersService,
    ],
    exports: [
        OwnersService,
    ],
})
export class OwnersModule {
}
