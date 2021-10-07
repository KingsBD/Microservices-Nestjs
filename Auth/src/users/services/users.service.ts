import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS') private readonly clientServiceUsers: ClientProxy,
  ) {}

  async findByEmail(email: string): Promise<UserDTO> {
    const pattern = { cmd: 'getUser' };
    let user;
    await this.clientServiceUsers
      .send<string>(pattern, { email })
      .forEach((x) => {
        user = x;
      });
    return user;
  }
}
