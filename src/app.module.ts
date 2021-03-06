import { Module } from '@nestjs/common';
import { ConfigModule } from './_config/config.module';
import { OpenApiService } from './_shared/open-api.service';

import { ExampleModule } from './example/example.module';
import { HerasModule } from './heras/heras.module';
import { NextagentModule } from './nextagent/nextagent.module';
import { DatabaseModule } from './_database/database.module';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        ExampleModule,
        HerasModule,
        NextagentModule,
    ],
    controllers: [],
    providers: [OpenApiService],
})
export class AppModule {
}
