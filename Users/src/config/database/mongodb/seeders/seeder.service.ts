import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../../users/services/users.service';
import { LoggerService } from '../../../../logger/service/logger.service';
import { LoggerDto } from '../../../../logger/dtos/logger.dto';
import { CreateUserDto } from '../../../../users/dtos/create-user.dto';

@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UsersService,
    private readonly loggerService: LoggerService,
  ) {}

  async createDafaultUser(): Promise<void> {
    const logId = this.loggerService.getLogId();
    const log: LoggerDto = {
      logId,
      method: `${SeederService.name}.${this.createDafaultUser.name}`,
    };
    try {
      const user: CreateUserDto = {
        firstName: 'test',
        middleName: 'test',
        lastName: 'test',
        email: 'daniel.reye32@logictran.com',
        secundaryEmail: 'test',
        phoneNumber: '3163426998',
        secundaryPhoneNumber: 'test',
        homeAddress: 'test',
        city: 'test',
        password: 'test',
      };
      const dbUser = await this.userService.findOne({ email: user.email });
      if (!dbUser) await this.userService.create(user);
      this.loggerService.traceEnd(log);
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
    }
  }
}
