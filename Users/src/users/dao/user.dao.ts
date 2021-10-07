import { Injectable } from '@nestjs/common';
import { InjectModel as InjectSchema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User as UserSchemaClass } from '../models/user.schema';
import { UserDTO } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectSchema(UserSchemaClass.name) private userSchema: Model<UserDocument>,
  ) {}

  findAll(filter = {}): Promise<UserDTO[]> {
    return this.userSchema.find(filter).exec();
  }

  findOne(filter = {}): Promise<UserDTO> {
    return this.userSchema.findOne(filter).exec();
  }

  create(user: CreateUserDto): Promise<UserDTO> {
    // eslint-disable-next-line new-cap
    const newUser = new this.userSchema(user);
    return newUser.save();
  }

  async update(user: UserDTO): Promise<[number, UserDTO[]]> {
    const { id, ...rest } = user;
    const dbUser = await this.userSchema.findByIdAndUpdate(id, rest);
    const count = dbUser ? 1 : 0;
    return [count, [dbUser]];
  }

  async delete(id: string): Promise<void> {
    await this.userSchema.findByIdAndDelete(id);
  }
}
