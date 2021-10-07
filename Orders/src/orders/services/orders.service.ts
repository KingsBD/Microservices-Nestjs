import { Injectable } from '@nestjs/common';
import { OrderDao } from '../dao/order.dao';
import { OrderDTO } from '../dtos/order.dto';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { ErrorException } from '../../utils/exception-filters/error-response.exception';
import * as OrderExceptions from '../exceptions/order.exceptions.json';

@Injectable()
export class OrdersService {
  constructor(private readonly orderDao: OrderDao) {}

  async findAll(filter = {}): Promise<OrderDTO[]> {
    try {
      throw new Error('Test');
      return await this.orderDao.findAll(filter);
    } catch (error) {
      throw new ErrorException(
        OrderExceptions['8000'].code,
        OrderExceptions['8000'].error,
        [error?.message],
      );
    }
  }

  async findOne(filter = {}): Promise<OrderDTO> {
    try {
      return await this.orderDao.findOne(filter);
    } catch (error) {
      throw new ErrorException(
        OrderExceptions['8001'].code,
        OrderExceptions['8001'].error,
        [error?.message],
      );
    }
  }

  async create(order: CreateOrderDto): Promise<string> {
    try {
      const result: OrderDTO = await this.orderDao.create(order);
      return result.id;
    } catch (error) {
      throw new ErrorException(
        OrderExceptions['8002'].code,
        OrderExceptions['8002'].error,
        [error?.message],
      );
    }
  }

  async update(order: OrderDTO): Promise<void> {
    let result: [number, OrderDTO[]];
    try {
      result = await this.orderDao.update(order);
    } catch (error) {
      throw new ErrorException(
        OrderExceptions['8003'].code,
        OrderExceptions['8003'].error,
        [error?.message],
      );
    }
    if (result[0] === 0)
      throw new ErrorException(404, 'This record does not exist');
  }

  async delete(id: string): Promise<void> {
    try {
      return await this.orderDao.delete(id);
    } catch (error) {
      throw new ErrorException(
        OrderExceptions['8004'].code,
        OrderExceptions['8004'].error,
        [error?.message],
      );
    }
  }
}
