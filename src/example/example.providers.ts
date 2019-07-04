import { Connection } from 'typeorm';
import { Example } from './example.entity';

export const exampleProviders = [
    {
        provide: 'EXAMPLE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Example),
        inject: ['EXAMPLE_DATABASE_CONNECTION'],
    },
];
