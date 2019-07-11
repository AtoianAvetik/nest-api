import { Module } from '@nestjs/common';
import { nextagentProviders } from '../nextagent.providers';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { UsersService } from '../users/users.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../_shared/multer-config.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: MulterConfigService,
        }),
    ],
    controllers: [
        AgentsController,
    ],
    providers: [
        ...nextagentProviders,
        AgentsService,
        UsersService,
    ],
})
export class AgentsModule {}
