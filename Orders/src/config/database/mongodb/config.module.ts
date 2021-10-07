import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { DatabaseMongoDBConfigService } from './config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongodb.url'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [DatabaseMongoDBConfigService],
  exports: [DatabaseMongoDBConfigService],
})
export class DatabaseMongoDBConfigModule {}
