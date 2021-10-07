import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import configuration from './config/configuration';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USERS',
        imports: [
          ConfigModule.forRoot({
            load: [configuration],
          }),
        ],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('user.host'),
            port: configService.get('user.port'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
