import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User as UserSchemaClass } from './models/user.schema';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserDao } from './dao/user.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserDao],
  exports: [UsersService, UserDao],
})
export class UsersModule {}
