import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderDTO } from '../dtos/order.dto';

const funtionsMock = {
  create: (): OrderDTO => undefined,
  findAll: (): OrderDTO[] => [],
  findOne: (): OrderDTO => undefined,
  update: (): [number, OrderDTO[]] => [0, []],
};

const createMock: CreateOrderDto = {
  description: 'test',
  userId: '6063826e-097a-4441-a66a-51a656589be8',
};

const recordMock: OrderDTO = {
  id: '6063826e-097a-4441-a66a-51a656589be8',
  ...createMock,
};

const updateResultMock: [number, OrderDTO[]] = [1, [recordMock]];

export { recordMock, funtionsMock, createMock, updateResultMock };
