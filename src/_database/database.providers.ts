import { createConnection } from 'typeorm';

import { Example } from 'src/example/example.entity';
import { Data } from '../heras/data.entity';

export const databaseProviders = [
    {
        provide: 'EXAMPLE_DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            username: 'root',
            password: '',
            database: 'examples',
            entities: [
                Example,
            ],
            synchronize: true,
        }),
    },
    {
        provide: 'HERAS_DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            username: 'root',
            password: '',
            database: 'heras',
            entities: [
                Data,
            ],
            synchronize: true,
        }),
    },
];
