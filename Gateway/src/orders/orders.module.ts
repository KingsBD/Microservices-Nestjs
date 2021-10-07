import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import configuration from './config/configuration';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDERS',
        imports: [
          ConfigModule.forRoot({
            load: [configuration],
          }),
        ],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('order.host'),
            port: configService.get('order.port'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
