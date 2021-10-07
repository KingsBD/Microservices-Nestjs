import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseMongoDBConfigService {
  constructor(private configService: ConfigService) {}

  get url(): string {
    return this.configService.get<string>(
      'mongodb.url',
      'mongodb://127.0.0.1:27017/mongodb_test',
    );
  }
}
