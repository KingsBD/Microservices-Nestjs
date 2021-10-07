import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuth = await this.authService.validateToken(
      request.headers.authorization.split(' ')[1],
    );
    if (!isAuth) throw new UnauthorizedException();
    return isAuth;
  }
}
