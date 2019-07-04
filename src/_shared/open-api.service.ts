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
            .setVersion(module.options.version)
            .addTag(module.options.tag)
            .build();

        const catDocument = SwaggerModule.createDocument(app, options, {
            include: module.constructors,
        });
        SwaggerModule.setup(module.path, app, catDocument);

        l.debug(`open api '${module.path}' loaded`);
    }
}
