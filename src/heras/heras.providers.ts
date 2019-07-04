import { Connection } from 'typeorm';
import { Data } from './data.entity';

export const herasProviders = [
    {
        provide: 'HERAS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Data),
        inject: ['HERAS_DATABASE_CONNECTION'],
    },
];
