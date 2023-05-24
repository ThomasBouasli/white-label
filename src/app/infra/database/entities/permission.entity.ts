import { Column, Entity } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { PermissionAction } from '@/app/infra/database/enum/permission-action.enum';
import { PermissionResource } from '@/app/infra/database/enum/permission-resource.enum';

import { BaseEntity } from '@/app/infra/database/entities/base.entity';
import { PermissionString } from '@/modules/auth/types/permission-string.type';

@ObjectType()
@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @Field()
  @Column({
    type: 'enum',
    enum: PermissionAction,
  })
  action: PermissionAction;

  @Field()
  @Column({
    type: 'enum',
    enum: PermissionResource,
  })
  resource: PermissionResource;

  toString(): PermissionString {
    return `${this.action}:${this.resource}`;
  }

  isEquals(permission: PermissionString): boolean {
    const [action, resource] = permission.split(':') as [
      PermissionAction,
      PermissionResource,
    ];

    //TODO: check if this is the best way to compare
    //Maybe use a regex to compare the string

    const isActionEquals = this.action === action || this.action === 'all';
    const isResourceEquals =
      this.resource === resource || this.resource === 'all';

    return isActionEquals && isResourceEquals;
  }
}
