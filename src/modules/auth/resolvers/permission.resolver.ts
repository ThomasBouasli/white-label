import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Permission } from '@/app/infra/database/entities/permission.entity';

import { Auth } from '../decorators/auth.decorator';
import { CreatePermissionDTO } from '../dto/create-permission.dto';
import { PermissionService } from '../services/permission.service';

@Resolver('Permission')
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Auth('read:permission')
  @Query(() => [Permission], { name: 'permissions' })
  async permissions(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Auth('read:permission')
  @Query(() => Permission, { name: 'permission' })
  async permission(@Args('id') id: string): Promise<Permission> {
    return this.permissionService.findById(id);
  }

  @Auth('create:permission')
  @Mutation(() => Permission, { name: 'createPermission' })
  async createPermission(
    @Args('data') data: CreatePermissionDTO,
  ): Promise<Permission> {
    return this.permissionService.create(data);
  }

  @Auth('delete:permission')
  @Mutation(() => Boolean, { name: 'deletePermission' })
  async deletePermission(@Args('id') id: string): Promise<boolean> {
    await this.permissionService.delete(id);

    return true;
  }
}
