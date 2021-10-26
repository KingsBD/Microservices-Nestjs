import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseMongoDBConfigModule } from './config/database/mongodb/config.module';
import { SeederModule } from './config/database/mongodb/seeders/seeders.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    DatabaseMongoDBConfigModule,
    UsersModule,
    AppConfigModule,
    LoggerModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
