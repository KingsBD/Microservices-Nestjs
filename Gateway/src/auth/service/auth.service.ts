import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH') private readonly clientServiceAuth: ClientProxy,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const pattern = { cmd: 'validate' };
    const payload = {
      username,
      password,
    };
    let user;
    await this.clientServiceAuth.send<string>(pattern, payload).forEach((x) => {
      user = x;
    });
    return user;
  }

  async login(user: any) {
    const pattern = { cmd: 'login' };
    const payload = user;
    let authData;
    await this.clientServiceAuth.send<string>(pattern, payload).forEach((x) => {
      authData = x;
    });
    return authData;
  }

  async validateToken(jwt: string) {
    try {
      const pattern = { cmd: 'check' };
      const payload = { jwt };
      let isAuth;
      await this.clientServiceAuth
        .send<string>(pattern, payload)
        .forEach((x) => {
          isAuth = x;
        });
      return isAuth;
    } catch (error) {
      return false;
    }
  }
}
