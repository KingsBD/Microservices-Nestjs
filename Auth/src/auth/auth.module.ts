import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthModule {}
