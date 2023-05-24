import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from '@/app/infra/database/entities/post.entity';

import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(data: CreatePostDTO): Promise<Post> {
    const post = this.postsRepository.create(data);

    return this.postsRepository.save(post);
  }

  async update(id: string, data: CreatePostDTO): Promise<Post> {
    const post = await this.postsRepository.findOneOrFail({ where: { id } });

    return this.postsRepository.save({
      ...post,
      ...data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.postsRepository.delete({ id });
  }

  async findByUserId(id: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: {
        id,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }
}
