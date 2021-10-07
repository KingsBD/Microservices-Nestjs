import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Res,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDTO } from '../dtos/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '../../logger/service/logger.service';
import { LoggerDto } from '../../logger/dtos/logger.dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  async getUsers(
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserDTO[]> {
    const logId = this.loggerService.getLogId();
    res.setHeader('logId', logId);
    const log: LoggerDto = {
      logId,
      method: `${UsersController.name}.${this.getUser.name}`,
    };
    try {
      this.loggerService.traceBegin(log);
      const result = await this.userService.findAll(log);
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDTO> {
    const logId = this.loggerService.getLogId();
    const log: LoggerDto = {
      logId,
      method: `${UsersController.name}.${this.getUser.name}`,
    };
    try {
      this.loggerService.traceBegin(log);
      const result = await this.userService.findOne(id, log);
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<{ id: string }> {
    const logId = this.loggerService.getLogId();
    const log: LoggerDto = {
      logId,
      method: `${UsersController.name}.${this.getUser.name}`,
      data: JSON.stringify(user),
    };
    try {
      this.loggerService.traceBegin(log);
      const id = await this.userService.create(user, log);
      this.loggerService.traceEnd(log);
      return { id };
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/indent
    @Body() user: UserDTO,
  ): Promise<void> {
    const logId = this.loggerService.getLogId();
    // eslint-disable-next-line no-param-reassign
    user.id = id;
    const log: LoggerDto = {
      logId,
      method: `${UsersController.name}.${this.getUser.name}`,
      data: JSON.stringify(user),
    };
    try {
      this.loggerService.traceBegin(log);
      const result = await this.userService.update(user, log);
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const logId = this.loggerService.getLogId();
    const log: LoggerDto = {
      logId,
      method: `${UsersController.name}.${this.getUser.name}`,
    };
    try {
      this.loggerService.traceBegin(log);
      const result = await this.userService.deleteUser(id, log);
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }
}
