import { NestFactory } from '@nestjs/core';
import { Logger as l } from '@nestjs/common';
import { AppModule } from './app.module';
import * as os from 'os';
import { ConfigService } from './_config/config.service';
import { OpenApiService } from './_shared/open-api.service';
import { openApiConfigs } from './_config/apis.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const welcom = port => () => l.debug(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);

    const configService: ConfigService = app.get(ConfigService);
    const openApiService: OpenApiService = app.get(OpenApiService);

    openApiService.applyApis(app, openApiConfigs);

    await app.listen(configService.get('PORT'), welcom(configService.get('PORT')));
}

bootstrap();
