import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    UsersModule,
    OrdersModule,
    AppConfigModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
