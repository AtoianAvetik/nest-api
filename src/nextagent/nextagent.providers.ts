import { Connection } from 'typeorm';
import { Agent, Owner, User, Supplier, AgentSupplier } from './entities';
import { DATABASE_CONNECTION, REPOSITORIES } from './constans';

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
        provide: REPOSITORIES.owners,
        useFactory: (connection: Connection) => connection.getRepository(Owner),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: REPOSITORIES.suppliers,
        useFactory: (connection: Connection) => connection.getRepository(Supplier),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: REPOSITORIES.agentSuppliers,
        useFactory: (connection: Connection) => connection.getRepository(AgentSupplier),
        inject: [DATABASE_CONNECTION],
    },
];
