import { ExampleModule } from '../example/example.module';

import { HerasModule } from '../heras/heras.module';

import { MODULES as NEXTAGENT_MODULES } from '../nextagent/modules';
import { TAGS as NEXTAGENT_TAGS, API_PATH as NEXTAGENT_API_PATH } from '../nextagent/constans';

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
        constructors: NEXTAGENT_MODULES,
        path: NEXTAGENT_API_PATH + 'docs',
        options: {
            title: 'The Next Agent',
            description: 'The Next Agents API description',
            version: '1.0',
            authorization: 'BEARER_AUTH',
            tags: NEXTAGENT_TAGS,
        },
    },
];
