import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '@/app/infra/database/entities/base.entity';

import { Permission } from './permission.entity';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'permission_groups' })
export class PermissionGroup extends BaseEntity {
  @Field()
  @Column({ length: 255 })
  name: string;

  @Field(() => [Permission], { nullable: true })
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permission_group_permissions',
    joinColumn: { name: 'permission_group_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions?: Permission[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_permission_groups',
    joinColumn: { name: 'permission_group_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users?: User[];
}
