import { Injectable, Logger as l } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Injectable()
export class OpenApiService {
    applyApis(app, data) {
        data.forEach(module => this.initSwagger(app, module));
    }

    initSwagger(app, module) {
        const options = new DocumentBuilder()
            .setTitle(module.options.title)
            .setDescription(module.options.description)
            .setVersion(module.options.version);

        if ( module.options.tags.constructor === Array ) {
            module.options.tags.forEach(tag => options.addTag(tag));
        }

        if ( module.options.tags.constructor === Object ) {
            for (const key in module.options.tags) {
                if (module.options.tags.hasOwnProperty(key)) {
                    options.addTag(module.options.tags[key]);
                }
            }
        }

        if ( module.options.authorization === 'BEARER_AUTH' ) {
            options.addBearerAuth('Authorization', 'header');
        }

        const buildedOptions = options.build();
        const document = SwaggerModule.createDocument(app, buildedOptions, {
            include: module.constructors,
        });
        SwaggerModule.setup(module.path, app, document);

        l.debug(`open api '${module.path}' loaded`);
    }
}
