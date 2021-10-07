import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDTO } from '../dtos/user.dto';

const funtionsMock = {
  create: (): UserDTO => undefined,
  findAll: (): UserDTO[] => [],
  findOne: (): UserDTO => undefined,
  update: (): [number, UserDTO[]] => [0, []],
};

const createMock: CreateUserDto = {
  firstName: 'test',
  lastName: 'test',
  email: 'test@test.com',
  phoneNumber: '3163426999',
  password: '3163426999',
};

const recordMock: UserDTO = {
  id: '6063826e-097a-4441-a66a-51a656589be8',
  ...createMock,
};

const updateResultMock: [number, UserDTO[]] = [1, [recordMock]];

export { recordMock, funtionsMock, createMock, updateResultMock };
