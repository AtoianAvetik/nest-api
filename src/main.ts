import { NestFactory } from '@nestjs/core';
import { Logger as l } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './_config/config.service';
import { OpenApiService } from './_shared/open-api.service';
import { openApiConfigs } from './_config/apis.config';
import * as os from 'os';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const welcom = port => () => l.debug(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);

    const configService: ConfigService = app.get(ConfigService);
    const openApiService: OpenApiService = app.get(OpenApiService);

    openApiService.applyApis(app, openApiConfigs);

    app.enableCors();

    app.use(express.static(path.join(__dirname, 'uploads')));

    await app.listen(configService.get('PORT'), welcom(configService.get('PORT')));
}

bootstrap();
