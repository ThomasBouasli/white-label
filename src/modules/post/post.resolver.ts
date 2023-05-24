import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Post } from '@/app/infra/database/entities/post.entity';

import { Auth } from '../auth/decorators/auth.decorator';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Auth('read:post')
  @Query(() => [Post], { name: 'posts' })
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Auth('create:post')
  @Mutation(() => Post, { name: 'createPost' })
  async createPost(@Args('data') data: CreatePostDTO): Promise<Post> {
    return this.postService.create(data);
  }

  @Auth('update:post')
  @Mutation(() => Post, { name: 'updatePost' })
  async updatePost(
    @Args('id') id: string,
    @Args('data') data: CreatePostDTO,
  ): Promise<Post> {
    return this.postService.update(id, data);
  }

  @Auth('delete:post')
  @Mutation(() => Boolean, { name: 'deletePost' })
  async deletePost(@Args('id') id: string): Promise<boolean> {
    await this.postService.delete(id);

    return true;
  }

  @Auth('read:post')
  @Query(() => [Post], { name: 'postsByUserId' })
  async postsByUserId(@Args('id') id: string): Promise<Post[]> {
    return this.postService.findByUserId(id);
  }
}
