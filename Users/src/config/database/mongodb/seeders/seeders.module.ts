import { Module } from '@nestjs/common';
import { UsersModule } from '../../../../users/users.module';
import { LoggerModule } from '../../../../logger/logger.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [UsersModule, LoggerModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
