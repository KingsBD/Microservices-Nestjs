import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { AllExceptionsFilter } from './utils/exception-filters/all-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const appConfig: AppConfigService = await app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .setTitle('Test API')
    .setDescription('API containing all backend endpoints.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: appConfig.host,
      port: appConfig.host_port,
    },
  });

  await app.startAllMicroservices();

  await app.listen(appConfig.port);
}

bootstrap();
