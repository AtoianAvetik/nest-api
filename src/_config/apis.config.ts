import { ExampleModule } from '../example/example.module';
import { HerasModule } from '../heras/heras.module';
import { NextagentModule } from '../nextagent/nextagent.module';
import { TAGS as NEXTAGENT_TAGS } from '../nextagent/types';

export const openApiConfigs = [
    {
        constructors: [ExampleModule],
        path: 'example/api/v1/docs',
        options: {
            title: 'Example',
            description: 'The example API description',
            version: '1.0',
            tags: ['example'],
        },
    },
    {
        constructors: [HerasModule],
        path: 'heras/api/v1/docs',
        options: {
            title: 'Heras',
            description: 'The heras API description',
            version: '1.0',
            tags: ['heras'],
        },
    },
    {
        constructors: [NextagentModule],
        path: 'nextagent/api/v1/docs',
        options: {
            title: 'The Next Agent',
            description: 'The Next Agents API description',
            version: '1.0',
            tags: NEXTAGENT_TAGS,
        },
    },
];
