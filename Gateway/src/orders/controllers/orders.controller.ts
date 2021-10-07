import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Res,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderDTO } from '../dtos/order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '../../logger/service/logger.service';
import { LoggerDto } from '../../logger/dtos/logger.dto';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrdersController {
  constructor(
    private readonly orderService: OrdersService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  async getOrders(
    @Res({ passthrough: true }) res: Response,
  ): Promise<OrderDTO[]> {
    const logId = this.loggerService.getLogId();
    res.setHeader('logId', logId);
    const log: LoggerDto = {
      logId,
      method: `${OrdersController.name}.${this.getOrder.name}`,
    };
    try {
      this.loggerService.traceBegin(log);
      const result = await this.orderService.findAll(log);
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<OrderDTO> {
    const logId = this.loggerService.getLogId();
    const log: LoggerDto = {
      logId,
      method: `${OrdersController.name}.${this.getOrder.name}`,
    };
    try {
      this.loggerService.traceBegin(log);
      const result = await this.orderService.findOne(id, log);
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }

  @Post()
  async createOrder(@Body() order: CreateOrderDto): Promise<{ id: string }> {
    const logId = this.loggerService.getLogId();
    const log: LoggerDto = {
      logId,
      method: `${OrdersController.name}.${this.getOrder.name}`,
      data: JSON.stringify(order),
    };
    try {
      this.loggerService.traceBegin(log);
      const id = await this.orderService.create(order, log);
      this.loggerService.traceEnd(log);
      return { id };
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/indent
    @Body() order: OrderDTO,
  ): Promise<void> {
    const logId = this.loggerService.getLogId();
    // eslint-disable-next-line no-param-reassign
    order.id = id;
    const log: LoggerDto = {
      logId,
      method: `${OrdersController.name}.${this.getOrder.name}`,
      data: JSON.stringify(order),
    };
    try {
      this.loggerService.traceBegin(log);
      const result = await this.orderService.update(order, log);
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    const logId = this.loggerService.getLogId();
    const log: LoggerDto = {
      logId,
      method: `${OrdersController.name}.${this.getOrder.name}`,
    };
    try {
      this.loggerService.traceBegin(log);
      const result = await this.orderService.deleteOrder(id, log);
      this.loggerService.traceEnd(log);
      return result;
    } catch (error) {
      log.error = error;
      this.loggerService.traceError(log);
      throw error;
    }
  }
}
