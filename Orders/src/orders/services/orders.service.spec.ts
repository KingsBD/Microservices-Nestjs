import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderDao } from '../dao/order.dao';
import {
  funtionsMock,
  recordMock,
  createMock,
  updateResultMock,
} from '../mocks/order.mock';
import { LoggerModule } from '../../logger/logger.module';

describe('OrdersService', () => {
  let service: OrdersService;
  let dao: OrderDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [OrdersService, { provide: OrderDao, useValue: funtionsMock }],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    dao = module.get<OrderDao>(OrderDao);
  });

  it('should return all orders', async () => {
    const result = [recordMock];
    jest.spyOn(dao, 'findAll').mockResolvedValue(result);
    expect(await service.findAll()).toBe(result);
  });

  it('should return the order', async () => {
    jest.spyOn(dao, 'findOne').mockResolvedValue(recordMock);
    expect(await service.findOne({ id: recordMock.id })).toBe(recordMock);
  });

  it('should create and return the id', async () => {
    jest.spyOn(dao, 'create').mockResolvedValue(recordMock);
    expect(await service.create(createMock)).toBe(recordMock.id);
  });

  it('should return update the order', async () => {
    jest.spyOn(dao, 'update').mockResolvedValue(updateResultMock);
    expect(await service.update(recordMock)).toBe(undefined);
  });
});
