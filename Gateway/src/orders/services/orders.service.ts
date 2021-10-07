import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDTO } from '../dtos/order.dto';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { LoggerDto } from '../../logger/dtos/logger.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS') private readonly clientServiceOrders: ClientProxy,
  ) {}

  async findAll(log: LoggerDto): Promise<OrderDTO[]> {
    const pattern = { cmd: 'getOrders' };
    const payload = { log };
    let order;
    await this.clientServiceOrders
      .send<string>(pattern, payload)
      .forEach((x) => {
        order = x;
      });
    return order;
  }

  async findOne(id: string, log: LoggerDto): Promise<OrderDTO> {
    const pattern = { cmd: 'getOrder' };
    const payload = { _id: id, log };
    let order;
    await this.clientServiceOrders
      .send<string>(pattern, payload)
      .forEach((x) => {
        order = x;
      });
    return order;
  }

  async create(order: CreateOrderDto, log: LoggerDto): Promise<string> {
    const pattern = { cmd: 'createOrder' };
    const payload = { order, log };
    let dbOrder;
    await this.clientServiceOrders
      .send<string>(pattern, payload)
      .forEach((x) => {
        dbOrder = x;
      });
    return dbOrder;
  }

  async update(order: OrderDTO, log: LoggerDto): Promise<void> {
    const pattern = { cmd: 'updateOrder' };
    const payload = { order, log };
    await this.clientServiceOrders
      .send<string>(pattern, payload)
      .forEach(() => {});
  }

  async deleteOrder(id: string, log: LoggerDto): Promise<void> {
    const pattern = { cmd: 'deleteOrder' };
    const payload = { id, log };
    let user;
    await this.clientServiceOrders
      .send<string>(pattern, payload)
      .forEach((x) => {
        user = x;
      });
    return user;
  }
}
