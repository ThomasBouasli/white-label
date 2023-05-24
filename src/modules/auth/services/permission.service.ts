import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Permission } from '@/app/infra/database/entities/permission.entity';

import { CreatePermissionDTO } from '../dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  async findById(id: string): Promise<Permission> {
    return this.permissionsRepository.findOne({
      where: { id },
    });
  }

  async create({ action, resource }: CreatePermissionDTO): Promise<Permission> {
    const permission = this.permissionsRepository.create({
      action,
      resource,
    });

    await this.permissionsRepository.save(permission);

    return permission;
  }

  async delete(id: string): Promise<void> {
    await this.permissionsRepository.delete(id);
  }
}
