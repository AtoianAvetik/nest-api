import { Connection } from 'typeorm';
import { Agent, User, UserBO } from './entities';
import { DATABASE_CONNECTION, REPOSITORIES } from './types';

export const nextagentProviders = [
    {
        provide: REPOSITORIES.agents,
        useFactory: (connection: Connection) => connection.getRepository(Agent),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: REPOSITORIES.users,
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: REPOSITORIES.usersBO,
        useFactory: (connection: Connection) => connection.getRepository(UserBO),
        inject: [DATABASE_CONNECTION],
    },
];
