import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @MessagePattern({ cmd: 'check' })
  async loggedIn(data) {
    try {
      return this.authService.validateToken(data.jwt);
    } catch (e) {
      return false;
    }
  }
}
