import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PermissionGroup } from '@/app/infra/database/entities/permission-group.entity';

import { AddPermissionsToGroupDTO } from '../dto/add-permission-to-group.dto';
import { CreatePermissionGroupDTO } from '../dto/create-permission-group.dto';
import { RemovePermissionsToGroupDTO } from '../dto/remove-permission-to-group.dto';

@Injectable()
export class PermissionGroupService {
  constructor(
    @InjectRepository(PermissionGroup)
    private permissionsRepository: Repository<PermissionGroup>,
  ) {}

  async findAll(): Promise<PermissionGroup[]> {
    return this.permissionsRepository.find();
  }

  async findById(id: string): Promise<PermissionGroup> {
    return this.permissionsRepository.findOne({
      where: { id },
    });
  }

  async findByName(name: string): Promise<PermissionGroup> {
    return this.permissionsRepository.findOne({
      where: { name },
    });
  }

  async create({ name }: CreatePermissionGroupDTO): Promise<PermissionGroup> {
    const permission = this.permissionsRepository.create({
      name,
    });

    await this.permissionsRepository.save(permission);

    return permission;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.permissionsRepository.delete(id);

    if (!deleted.affected) {
      throw new NotFoundException('Group not found');
    }

    return true;
  }

  async addPermissions({
    groupId,
    permissionIds,
  }: AddPermissionsToGroupDTO): Promise<void> {
    const group = await this.permissionsRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const permissions = [];

    for await (const permissionId of permissionIds) {
      const permission = await this.permissionsRepository.findOne({
        where: { id: permissionId },
      });

      permissions.push(permission);
    }

    group.permissions = permissions;

    await this.permissionsRepository.save(group);
  }

  async removePermissions({
    groupId,
    permissionIds,
  }: RemovePermissionsToGroupDTO): Promise<void> {
    const group = await this.permissionsRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const permissions = [];

    for await (const permissionId of permissionIds) {
      const permission = await this.permissionsRepository.findOne({
        where: { id: permissionId },
      });

      permissions.push(permission);
    }

    group.permissions = group.permissions.filter(
      (permission) => !permissions.includes(permission),
    );

    await this.permissionsRepository.save(group);
  }
}
