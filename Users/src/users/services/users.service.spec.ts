import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserDao } from '../dao/user.dao';
import {
  funtionsMock,
  recordMock,
  createMock,
  updateResultMock,
} from '../mocks/user.mock';
import { LoggerModule } from '../../logger/logger.module';

describe('UsersService', () => {
  let service: UsersService;
  let dao: UserDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [UsersService, { provide: UserDao, useValue: funtionsMock }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    dao = module.get<UserDao>(UserDao);
  });

  it('should return all user', async () => {
    const result = [recordMock];
    jest.spyOn(dao, 'findAll').mockResolvedValue(result);
    expect(await service.findAll()).toBe(result);
  });

  it('should return the user', async () => {
    jest.spyOn(dao, 'findOne').mockResolvedValue(recordMock);
    expect(await service.findOne({ id: recordMock.id })).toBe(recordMock);
  });

  it('should return the id', async () => {
    jest.spyOn(dao, 'create').mockResolvedValue(recordMock);
    expect(await service.create(createMock)).toBe(recordMock.id);
  });

  it('should return undefined', async () => {
    jest.spyOn(dao, 'update').mockResolvedValue(updateResultMock);
    expect(await service.update(recordMock)).toBe(undefined);
  });
});
