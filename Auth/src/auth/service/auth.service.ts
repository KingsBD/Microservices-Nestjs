import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(userAuthData: {
    username: string;
    password: string;
  }): Promise<any> {
    const { username, password } = userAuthData;
    const user = await this.usersService.findByEmail(username);
    if (password !== user.password) throw new Error('Unauthorized');
    return user;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}
