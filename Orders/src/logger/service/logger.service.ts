import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { v4 as uuidv4 } from 'uuid';
import { LoggerDto } from '../dtos/logger.dto';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  getMessageByLog(log: LoggerDto): string {
    return `{ id: ${log.logId}, method: ${log.method}${
      log.data ? `, data: ${log.data}` : ''
    }${log.error ? `, error: ${log.error}` : ''} }`;
  }

  traceError(log: LoggerDto) {
    this.logger.error(`{Error: ${this.getMessageByLog(log)}}`);
  }

  traceBegin(log: LoggerDto) {
    this.logger.info(`{Begin: ${this.getMessageByLog(log)}}`);
  }

  traceEnd(log: LoggerDto) {
    this.logger.info(`{End: ${this.getMessageByLog(log)}}`);
  }

  traceFilter(log: LoggerDto) {
    this.logger.info(`{Filter: ${this.getMessageByLog(log)}}`);
  }

  getLogId() {
    return uuidv4();
  }
}
