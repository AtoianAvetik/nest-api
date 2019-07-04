import { ExampleModule } from '../example/example.module';
import { HerasModule } from '../heras/heras.module';

export const openApiConfigs = [
    {
        constructors: [ExampleModule],
        path: 'example/api/v1/docs',
        options: {
            title: 'Example',
            description: 'The example API description',
            version: '1.0',
            tag: 'example',
        },
    },
    {
        constructors: [HerasModule],
        path: 'heras/api/v1/docs',
        options: {
            title: 'Heras',
            description: 'The heras API description',
            version: '1.0',
            tag: 'heras',
        },
    },
];
