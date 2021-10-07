import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderDTO } from '../dtos/order.dto';
import { Log } from '../../logger/decorator/logger.decorator';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'getOrders' })
  @Log()
  getOrders(filter?: any): Promise<OrderDTO[]> {
    return this.ordersService.findAll(filter);
  }

  @MessagePattern({ cmd: 'getOrder' })
  @Log()
  getOrder(filter?: any): Promise<OrderDTO> {
    return this.ordersService.findOne(filter);
  }

  @MessagePattern({ cmd: 'createOrder' })
  @Log()
  async createOrder(data: { order: CreateOrderDto }): Promise<string> {
    return this.ordersService.create(data.order);
  }

  @MessagePattern({ cmd: 'updateOrder' })
  @Log()
  updateOrder(data: { order: OrderDTO }): Promise<void> {
    return this.ordersService.update(data.order);
  }

  @MessagePattern({ cmd: 'deleteOrder' })
  @Log()
  deleteOrder(data: { id: string }): Promise<void> {
    return this.ordersService.delete(data.id);
  }
}
