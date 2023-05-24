import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionGroup } from '@/app/infra/database/entities/permission-group.entity';

import { Auth } from '../decorators/auth.decorator';
import { AddPermissionsToGroupDTO } from '../dto/add-permission-to-group.dto';
import { CreatePermissionGroupDTO } from '../dto/create-permission-group.dto';
import { RemovePermissionsToGroupDTO } from '../dto/remove-permission-to-group.dto';
import { PermissionGroupService } from '../services/permission-group.service';

@Resolver('PermissionGroup')
export class PermissionGroupResolver {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  @Auth('read:permission_group')
  @Query(() => [PermissionGroup], { name: 'permissionGroups' })
  async permissionGroups(): Promise<PermissionGroup[]> {
    return this.permissionGroupService.findAll();
  }

  @Auth('read:permission_group')
  @Query(() => PermissionGroup, { name: 'permissionGroup' })
  async permissionGroupById(@Args('id') id: string): Promise<PermissionGroup> {
    return this.permissionGroupService.findById(id);
  }

  @Auth('read:permission_group')
  @Query(() => PermissionGroup, { name: 'permissionGroup' })
  async permissionGroupByName(
    @Args('name') name: string,
  ): Promise<PermissionGroup> {
    return this.permissionGroupService.findByName(name);
  }

  @Auth('create:permission_group')
  @Mutation(() => PermissionGroup, { name: 'createPermissionGroup' })
  async createPermissionGroup(
    @Args('data') name: CreatePermissionGroupDTO,
  ): Promise<PermissionGroup> {
    return this.permissionGroupService.create(name);
  }

  @Auth('delete:permission_group')
  @Mutation(() => Boolean, { name: 'deletePermissionGroup' })
  async deletePermissionGroup(@Args('id') id: string): Promise<boolean> {
    return await this.permissionGroupService.delete(id);
  }

  @Auth('update:permission_group')
  @Mutation(() => Boolean, { name: 'addPermissionsToGroup' })
  async addPermissionsToGroup(
    @Args('data') data: AddPermissionsToGroupDTO,
  ): Promise<boolean> {
    await this.permissionGroupService.addPermissions(data);

    return true;
  }

  @Auth('update:permission_group')
  @Mutation(() => Boolean, { name: 'removePermissionsToGroup' })
  async removePermissionsToGroup(
    @Args('data') data: RemovePermissionsToGroupDTO,
  ): Promise<boolean> {
    await this.permissionGroupService.removePermissions(data);

    return true;
  }
}
