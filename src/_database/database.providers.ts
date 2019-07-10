import { createConnection } from 'typeorm';

import { Example } from '../example/example.entity';
import { Data } from '../heras/data.entity';
import { DATABASE_CONNECTION as NEXTAGENT_DB_CONNECTION } from '../nextagent/types';
import NEXTAGET_ENTITIES from '../nextagent/entities';

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
    {
        provide: NEXTAGENT_DB_CONNECTION,
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            username: 'root',
            password: '',
            database: 'nextagent',
            entities: NEXTAGET_ENTITIES,
            synchronize: true,
        }),
    },
];
