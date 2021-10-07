import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  description: string;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
