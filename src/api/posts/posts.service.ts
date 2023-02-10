import { LocalDatabaseDriver } from '@/db';
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PostListQueryDto } from './dto/posts-list.dto';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findAll(payload: PostListQueryDto) {
    const db = new LocalDatabaseDriver('posts');
    return db.list({
      take: payload.take,
      offset: payload.offset,
      after: payload.after,
      sort: payload.sort,
      sortBy: payload.sortBy,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
