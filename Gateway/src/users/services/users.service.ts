import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDTO } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoggerDto } from '../../logger/dtos/logger.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS') private readonly clientServiceUsers: ClientProxy,
  ) {}

  async findAll(log: LoggerDto): Promise<UserDTO[]> {
    const pattern = { cmd: 'getUsers' };
    const payload = { log };
    let users;
    await this.clientServiceUsers
      .send<string>(pattern, payload)
      .forEach((x) => {
        users = x;
      });
    return users;
  }

  async findOne(id: string, log: LoggerDto): Promise<UserDTO> {
    const pattern = { cmd: 'getUser' };
    const payload = { _id: id, log };
    let user;
    await this.clientServiceUsers
      .send<string>(pattern, payload)
      .forEach((x) => {
        user = x;
      });
    return user;
  }

  async create(user: CreateUserDto, log: LoggerDto): Promise<string> {
    const pattern = { cmd: 'createUser' };
    const payload = { user, log };
    let dbUser;
    await this.clientServiceUsers
      .send<string>(pattern, payload)
      .forEach((x) => {
        dbUser = x;
      });
    return dbUser;
  }

  async update(user: UserDTO, log: LoggerDto): Promise<void> {
    const pattern = { cmd: 'updateUser' };
    const payload = { user, log };
    await this.clientServiceUsers
      .send<string>(pattern, payload)
      .forEach(() => {});
  }

  async deleteUser(id: string, log: LoggerDto): Promise<void> {
    const pattern = { cmd: 'deleteUser' };
    const payload = { id, log };
    let user;
    await this.clientServiceUsers
      .send<string>(pattern, payload)
      .forEach((x) => {
        user = x;
      });
    return user;
  }
}
