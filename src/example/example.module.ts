import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { DatabaseModule } from '../_database/database.module';
import { exampleProviders } from './example.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ExampleController],
    providers: [
        ...exampleProviders,
        ExampleService,
    ],
})
export class ExampleModule {
}
