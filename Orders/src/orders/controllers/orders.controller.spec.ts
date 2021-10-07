import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../services/orders.service';
import { funtionsMock, createMock, recordMock } from '../mocks/order.mock';
import { LoggerModule } from '../../logger/logger.module';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: funtionsMock }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should return an array of order', async () => {
    const result = [recordMock];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.getOrders()).toBe(result);
  });

  it('should return the order', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(recordMock);
    expect(await controller.getOrder(recordMock.id)).toBe(recordMock);
  });

  it('should create a order and return the id', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(recordMock.id);
    expect(await controller.createOrder(createMock)).toEqual(recordMock.id);
  });

  it('should update the order and not return a value', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(undefined);
    expect(await controller.updateOrder(recordMock)).toBe(undefined);
  });
});
