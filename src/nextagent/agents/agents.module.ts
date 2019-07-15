import { Module } from '@nestjs/common';
import { nextagentProviders } from '../nextagent.providers';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../../_shared/multer-config.service';
import { ConfigService } from '../../_config/config.service';
import { MODULE_UPLOADS_DEST } from '../constans';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return new MulterConfigService().createMulterOptions({
                    dest: configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents,
                    maxFileSize: 100000000,
                });
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [
        AgentsController,
    ],
    providers: [
        ...nextagentProviders,
        AgentsService,
    ],
    exports: [
        AgentsService,
    ],
})
export class AgentsModule {
}
