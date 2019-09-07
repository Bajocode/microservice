import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './AppModule';
import { ConfigService } from './config/ConfigService';
import * as packageJson from '../package.json';
import bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get('ConfigService') as ConfigService;

  app.setGlobalPrefix(configService.apiGlobalPrefix);
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  configureSwagger(configService, app);

  await app.listen(configService.serverPort, configService.serverDomain, () => {
    Logger.log(
      `Microservice started:
      http://${configService.serverDomain}:${configService.serverPort}/swagger`,
    );
  });
}

bootstrap();

function configureSwagger(configService: ConfigService, app: INestApplication) {
  const documentBuilder = new DocumentBuilder()
    .setTitle(configService.apiDocsTitle || packageJson.name)
    .setDescription(`${configService.apiDocsDescription}`)
    .setExternalDoc('External documentation', '/swagger-json')
    .setBasePath(`/${configService.apiGlobalPrefix}`)
    .setVersion(packageJson.version)
    .setSchemes('https', 'http');

  SwaggerModule.setup(
    configService.apiDocsPath,
    app,
    SwaggerModule.createDocument(app, documentBuilder.build()),
  );
}
