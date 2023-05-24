import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '@/app/infra/database/entities/base.entity';

import { PermissionGroup } from './permission-group.entity';
import { Permission } from './permission.entity';
import { Post } from './post.entity';
import { HashPasswordTransformer } from './transformers/hash-password.transformer';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field()
  @Column({ length: 255 })
  name: string;

  @Field()
  @Column({ length: 255, unique: true })
  email: string;

  @HideField()
  @Column({ length: 255, transformer: HashPasswordTransformer })
  password: string;

  @Field(() => [PermissionGroup], { nullable: true })
  @ManyToMany(() => PermissionGroup)
  @JoinTable({
    name: 'user_permission_groups',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'permission_group_id' },
  })
  permission_groups?: PermissionGroup[];

  @Field(() => [Permission], { nullable: true })
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'user_permissions',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions?: Permission[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];
}
