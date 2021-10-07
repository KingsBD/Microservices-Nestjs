import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  middleName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  secundaryEmail: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  secundaryPhoneNumber: string;

  @Prop()
  homeAddress: string;

  @Prop()
  city: string;

  @Prop()
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
