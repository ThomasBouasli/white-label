import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';

import { Permission } from '@/app/infra/database/entities/permission.entity';
import { User } from '@/app/infra/database/entities/user.entity';

import { RegisterUserDTO } from './dto/register-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {}

  async register(data: RegisterUserDTO): Promise<User> {
    const user = this.usersRepository.create(data);

    await this.usersRepository.save(user);

    this.eventEmitter.emit('user.registered', user);

    return user;
  }

  async registerAdmin(data: RegisterUserDTO): Promise<User> {
    const user = this.usersRepository.create(data);

    await this.usersRepository.save(user);

    this.eventEmitter.emit('admin.registered', user);

    return user;
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    await this.usersRepository.update({ id }, data);

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.usersRepository.delete({ id });

    return deleteResult.affected === 1;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async getUserPermissions(user_id: string): Promise<Permission[]> {
    const user = await this.usersRepository.findOne({
      where: { id: user_id },
      relations: {
        permission_groups: {
          permissions: true,
        },
        permissions: true,
      },
    });

    if (!user) {
      return [];
    }

    const userPermissions = user.permissions.map((permission) => permission);

    user.permission_groups.forEach((permissionGroup) => {
      permissionGroup.permissions.forEach((permission) => {
        userPermissions.push(permission);
      });
    });

    return userPermissions;
  }
}
