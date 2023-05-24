import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '@/app/infra/database/entities/base.entity';

import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Field()
  @Column({ length: 255 })
  title: string;

  @Field()
  @Column({ length: 255 })
  content: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
