import { Module } from '@nestjs/common';
import { HerasController } from './heras.controller';
import { HerasService } from './heras.service';
import { DatabaseModule } from '../_database/database.module';
import { herasProviders } from './heras.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [HerasController],
    providers: [
        ...herasProviders,
        HerasService,
    ],
})
export class HerasModule {
}
