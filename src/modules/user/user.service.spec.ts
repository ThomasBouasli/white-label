import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { DatabaseModule } from '@/app/infra/database/database.module';

import { User } from '@/app/infra/database/entities/user.entity';

import { RegisterUserDTO } from './dto/register-user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        EventEmitterModule.forRoot(),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('CRUD', () => {
    it('should register a user', async () => {
      const dto: RegisterUserDTO = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const user = await service.register(dto);

      expect(user).toBeDefined();
    });

    it('should find a user by email', async () => {
      const dto: RegisterUserDTO = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const user = await service.register(dto);

      expect(user).toBeDefined();

      const userFound = await service.findByEmail(user.email);

      expect(userFound).toBeDefined();
    });

    it('should update a user', async () => {
      const dto: RegisterUserDTO = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const user = await service.register(dto);

      expect(user).toBeDefined();

      const userUpdated = await service.update(user.id, {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });

      expect(userUpdated).toBeDefined();
      expect(userUpdated.id).toEqual(user.id);
      expect(userUpdated.name).not.toEqual(user.name);
      expect(userUpdated.email).not.toEqual(user.email);
    });

    it('should delete a user', async () => {
      const dto: RegisterUserDTO = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const user = await service.register(dto);

      expect(user).toBeDefined();

      const userDeleted = await service.delete(user.id);

      expect(userDeleted).toBe(true);

      const userFound = await service.findByEmail(user.email);

      expect(userFound).toBeFalsy();
    });
  });
});
