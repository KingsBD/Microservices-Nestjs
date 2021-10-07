import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseMongoDBConfigModule } from './config/database/mongodb/config.module';
import { OrdersModule } from './orders/orders.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    DatabaseMongoDBConfigModule,
    OrdersModule,
    AppConfigModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
