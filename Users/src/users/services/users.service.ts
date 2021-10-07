import { Injectable } from '@nestjs/common';
import { UserDao } from '../dao/user.dao';
import { UserDTO } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ErrorException } from '../../utils/exception-filters/error-response.exception';
import * as UserExceptions from '../exceptions/user.exceptions.json';

@Injectable()
export class UsersService {
  constructor(private readonly userDao: UserDao) {}

  async findAll(filter = {}): Promise<UserDTO[]> {
    try {
      return await this.userDao.findAll(filter);
    } catch (error) {
      throw new ErrorException(
        UserExceptions['7000'].code,
        UserExceptions['7000'].error,
        [error?.message],
      );
    }
  }

  async findOne(filter = {}): Promise<UserDTO> {
    try {
      return await this.userDao.findOne(filter);
    } catch (error) {
      throw new ErrorException(
        UserExceptions['7001'].code,
        UserExceptions['7001'].error,
        [error?.message],
      );
    }
  }

  async create(user: CreateUserDto): Promise<string> {
    try {
      const result: UserDTO = await this.userDao.create(user);
      return result.id;
    } catch (error) {
      throw new ErrorException(
        UserExceptions['7002'].code,
        UserExceptions['7002'].error,
        [error?.message],
      );
    }
  }

  async update(user: UserDTO): Promise<void> {
    let result: [number, UserDTO[]];
    try {
      result = await this.userDao.update(user);
    } catch (error) {
      throw new ErrorException(
        UserExceptions['7003'].code,
        UserExceptions['7003'].error,
        [error?.message],
      );
    }
    if (result[0] === 0)
      throw new ErrorException(404, 'This record does not exist');
  }

  async delete(id: string): Promise<void> {
    try {
      return await this.userDao.delete(id);
    } catch (error) {
      throw new ErrorException(
        UserExceptions['7004'].code,
        UserExceptions['7004'].error,
        [error?.message],
      );
    }
  }
}
