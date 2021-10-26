import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SeederService } from './config/database/mongodb/seeders/seeder.service';
import { AppConfigService } from './config/app/config.service';
import { AppConfigModule } from './config/app/config.module';
import { AppModule } from './app.module';

async function bootstrap() {
  let dummyApp = await NestFactory.create(AppConfigModule);
  const appConfigService = dummyApp.get(AppConfigService);
  const host = appConfigService.url;
  const { port } = appConfigService;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );
  const seederService = app.get(SeederService);
  await seederService.createDafaultUser();
  app.listen();
}

bootstrap();
