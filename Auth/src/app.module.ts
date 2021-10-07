import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [UsersModule, AppConfigModule, AuthModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
