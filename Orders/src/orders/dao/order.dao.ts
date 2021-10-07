import { Injectable } from '@nestjs/common';
import { InjectModel as InjectSchema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OrderDocument,
  Order as OrderSchemaClass,
} from '../models/order.schema';
import { OrderDTO } from '../dtos/order.dto';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrderDao {
  constructor(
    @InjectSchema(OrderSchemaClass.name)
    private orderSchema: Model<OrderDocument>,
  ) {}

  findAll(filter = {}): Promise<OrderDTO[]> {
    return this.orderSchema.find(filter).exec();
  }

  findOne(filter = {}): Promise<OrderDTO> {
    return this.orderSchema.findOne(filter).exec();
  }

  create(order: CreateOrderDto): Promise<OrderDTO> {
    // eslint-disable-next-line new-cap
    const newOrder = new this.orderSchema(order);
    return newOrder.save();
  }

  async update(order: OrderDTO): Promise<[number, OrderDTO[]]> {
    const { id, ...rest } = order;
    const dbOrder = await this.orderSchema.findByIdAndUpdate(id, rest);
    const count = dbOrder ? 1 : 0;
    return [count, [dbOrder]];
  }

  async delete(id: string): Promise<void> {
    await this.orderSchema.findByIdAndDelete(id);
  }
}
