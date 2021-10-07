import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(data: { username: string; password: string }) {
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'check' })
  async loggedIn(data: any) {
    try {
      return this.authService.validateToken(data.jwt);
    } catch (e) {
      return false;
    }
  }

  @MessagePattern({ cmd: 'validate' })
  async validateUser(data: { username: string; password: string }) {
    return this.authService.validateUser(data);
  }
}
