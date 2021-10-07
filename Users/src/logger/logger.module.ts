import { Module, Global } from '@nestjs/common';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { LoggerService } from './service/logger.service';
import 'winston-daily-rotate-file';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [
        new winston.transports.DailyRotateFile({
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '15d',
          filename: `${__dirname}/../../logs/test-log-%DATE%.log`,
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
