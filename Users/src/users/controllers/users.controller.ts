import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDTO } from '../dtos/user.dto';
import { Log } from '../../logger/decorator/logger.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern({ cmd: 'getUsers' })
  @Log()
  getUsers(filter?: any): Promise<UserDTO[]> {
    return this.userService.findAll(filter);
  }

  @MessagePattern({ cmd: 'getUser' })
  @Log()
  getUser(filter?: any): Promise<UserDTO> {
    return this.userService.findOne(filter);
  }

  @MessagePattern({ cmd: 'createUser' })
  @Log()
  async createUser(data: { user: CreateUserDto }): Promise<string> {
    return this.userService.create(data.user);
  }

  @MessagePattern({ cmd: 'updateUser' })
  @Log()
  updateUser(data: { user: UserDTO }): Promise<void> {
    return this.userService.update(data.user);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  @Log()
  deleteUser(data: { id: string }): Promise<void> {
    return this.userService.delete(data.id);
  }
}
