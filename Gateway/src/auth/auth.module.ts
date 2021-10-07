import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import configuration from './config/configuration';

@Global()
@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH',
        imports: [
          ConfigModule.forRoot({
            load: [configuration],
          }),
        ],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('auth.host'),
            port: configService.get('auth.port'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
